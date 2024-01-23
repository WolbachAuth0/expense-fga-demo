import { NextApiRequest, NextApiResponse } from 'next';
import { OpenFgaClient, CredentialsMethod } from '@openfga/sdk';
import { getFGAJWT } from '@/utils/token_utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Parse FGA fields
    const { user, relation, type } = req.body;

    const fga_token = await getFGAJWT();

    if (fga_token) {
        // Instantiate FGA client
        const fgaClient = new OpenFgaClient({
            apiHost: process.env.FGA_API_HOST || '',
            storeId: process.env.FGA_STORE_ID,
            credentials: {
                method: CredentialsMethod.ApiToken,
                config: {
                    token: fga_token,
                }
            } 
        });

        // Check Result
        const result = await fgaClient.listObjects({
            user,
            relation,
            type,
        })
        return res.status(200).json({
            result: result
        });
    }
};