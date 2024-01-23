import * as jose from 'jose'
import { kv } from '@vercel/kv';

export function checkIsJwtExpired(jwt: string) {
    const decoded = jose.decodeJwt(jwt);
    if (decoded?.exp) {
        return decoded.exp < (Date.now() / 1000);
    }
}

export async function renewFGAJWT() {
    const res = await fetch(
        `${process.env.FGA_TOKEN_ENDPOINT}`,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ 
                client_id: process.env.FGA_CLIENT_ID, 
                client_secret: process.env.FGA_CLIENT_SECRET,
                audience: process.env.FGA_API_AUDIENCE,
                grant_type: 'client_credentials' 
            }),
        }
    );
    const data = await res.json();
    return data.access_token;
}

export async function verifyJWT(jwt: string) {
    let cached_jwks = await kv.get('jwks');
    
    let JWKS;
    if (!cached_jwks) {
        JWKS = jose.createRemoteJWKSet(new URL(`https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`))
    } else {
        let jwks = cached_jwks as jose.JSONWebKeySet;
        JWKS = jose.createLocalJWKSet(jwks);
    }
    
    const { payload } = await jose.jwtVerify(jwt, JWKS, {
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        audience: [
            `${process.env.AUTH0_API_AUDIENCE}`,
            `https:/${process.env.AUTH0_DOMAIN}/userinfo`
        ],
    });

    return !!payload;
}

export async function getFGAJWT() {
    // Check cache for FGA Access Token
    let cached_token = await kv.get('fga_token');
    let fga_token = cached_token?.toString();

    // If token is not found or is expired, get a new one
    if (!fga_token || checkIsJwtExpired(fga_token)) {
        fga_token = await renewFGAJWT();
        await kv.set('fga_token', fga_token);
    }

    return fga_token;
}