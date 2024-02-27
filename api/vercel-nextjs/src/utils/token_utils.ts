import * as jose from "jose";
import { kv } from "@vercel/kv";

export function checkIsJwtExpired(jwt: string) {
  const decoded = jose.decodeJwt(jwt);
  if (decoded?.exp) {
    return decoded.exp < Date.now() / 1000;
  }
}

export async function verifyJWT(jwt: string) {
  // Check cache for saved JWKS
  let cached_jwks = await kv.get("jwks");
  let token_payload = null;
  let jwtError = null;

  let JWKS;
  if (!cached_jwks) {
    cached_jwks = await fetchAndCacheJWKS();
  }

  try {
    let jwks = cached_jwks as jose.JSONWebKeySet;
    JWKS = jose.createLocalJWKSet(jwks);
    const { payload } = await jose.jwtVerify(jwt, JWKS, {
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      audience: [
        `${process.env.AUTH0_API_AUDIENCE}`,
        `https:/${process.env.AUTH0_DOMAIN}/userinfo`,
      ],
    });

    // Token signature verification is valid
    token_payload = payload;
  } catch (e) {
    jwtError = e;
  } finally {
    return { token_payload, jwtError };
  }
}

export async function fetchAndCacheJWKS() {
  // Grab latest from Auth0 if JWKS not found
  const jwks = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  );

  // Cache JWKS for future requests
  await kv.set("jwks", jwks);
  return jwks;
}

export async function getFGAJWT() {
  // Check cache for FGA Access Token
  let cached_token = await kv.get("fga_token");
  let fga_token = cached_token?.toString();

  // If token is not found or is expired, get a new one
  if (!fga_token || checkIsJwtExpired(fga_token)) {
    fga_token = await renewFGAJWT();
    await kv.set("fga_token", fga_token);
  }

  return fga_token;
}

export async function renewFGAJWT() {
  const res = await fetch(`${process.env.FGA_TOKEN_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.FGA_CLIENT_ID,
      client_secret: process.env.FGA_CLIENT_SECRET,
      audience: process.env.FGA_API_AUDIENCE,
      grant_type: "client_credentials",
    }),
  });
  const data = await res.json();
  return data.access_token;
}
