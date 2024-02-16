import * as jose from 'jose';

export async function verifyJWT(jwt: string) {
  let cached_jwks = null; //await kv.get('jwks');

  let JWKS;
  if (!cached_jwks) {
    JWKS = jose.createRemoteJWKSet(
      new URL(`https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`),
    );
  } else {
    let jwks = cached_jwks as jose.JSONWebKeySet;
    JWKS = jose.createLocalJWKSet(jwks);
  }

  try {
    const { payload } = await jose.jwtVerify(jwt, JWKS, {
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      audience: [
        `${process.env.AUTH0_API_AUDIENCE}`,
        `https:/${process.env.AUTH0_DOMAIN}/userinfo`,
      ],
    });
    return payload;
  } catch (e) {
    console.log('jose error', e);
    return false;
  }
}
