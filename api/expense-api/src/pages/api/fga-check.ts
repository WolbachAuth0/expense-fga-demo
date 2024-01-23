import { NextApiRequest, NextApiResponse } from 'next';
import { OpenFgaClient, CredentialsMethod } from '@openfga/sdk';
import { kv } from '@vercel/kv';
import { checkIsJwtExpired, renewFGAJWT } from '@/utils/token_utils';

// Vercel commit
export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Parse FGA fields
    const { user, relation, object } = req.body;

    // Check cache for FGA Access Token
    let cached_token = await kv.get('fga_token');
    let api_token = cached_token?.toString();

    // If token is not found or is expired, get a new one
    if (!api_token || checkIsJwtExpired(api_token)) {
        api_token = await renewFGAJWT();
        await kv.set('fga_token', api_token);
    }

    // Instantiate FGA client
    const fgaClient = new OpenFgaClient({
        apiHost: 'api.us1.fga.dev', 
        storeId: '01GJ3SQKTDV7AXQWMPYYZGEF0B',
        credentials: {
            method: CredentialsMethod.ApiToken,
            config: {
                token: api_token || '',
            }
        } 
    });

    // Check Result
    const result = await fgaClient.check({
        user: user,
        relation: relation,
        object: object,
    });
    return res.status(200).json({
        result: result
    });
};