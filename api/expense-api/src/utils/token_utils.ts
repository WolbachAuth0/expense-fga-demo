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
        `https://fga.us.auth0.com/oauth/token`,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ 
                client_id: process.env.FGA_CLIENT_ID, 
                client_secret: process.env.FGA_CLIENT_SECRET, 
                audience: 'https://api.us1.fga.dev/', 
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
        JWKS = jose.createRemoteJWKSet(new URL('https://samyapkowitz.us.auth0.com/.well-known/jwks.json'))
    } else {
        let jwks = cached_jwks as jose.JSONWebKeySet;
        JWKS = jose.createLocalJWKSet(jwks);
    }
    
    const { payload } = await jose.jwtVerify(jwt, JWKS, {
        issuer: 'https://auth.samyap.dev/',
        audience: [
            "http://localhost:8080",
            "https://samyapkowitz.us.auth0.com/userinfo"
        ],
    });

    return !!payload;
}