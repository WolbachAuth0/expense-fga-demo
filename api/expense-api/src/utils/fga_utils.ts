import { OpenFgaClient, CredentialsMethod } from '@openfga/sdk';

export async function writeTuple(token: string, payload: FGAWriteTuple) {
    const { user, object, relation } = payload;
    
    const fgaClient = new OpenFgaClient({
        apiHost: process.env.FGA_API_HOST || '',
        storeId: process.env.FGA_STORE_ID,
        credentials: {
            method: CredentialsMethod.ApiToken,
            config: {
                token: token,
            }
        } 
    });

    const result = await fgaClient.write({
        writes: [{
            user,
            relation,
            object,
        }]
    });

    return result;
}


export async function checkTuple(token: string, payload: FGACheckTuple) {
    const { user, object, relation } = payload;
    
    const fgaClient = new OpenFgaClient({
        apiHost: process.env.FGA_API_HOST || '',
        storeId: process.env.FGA_STORE_ID,
        credentials: {
            method: CredentialsMethod.ApiToken,
            config: {
                token: token,
            }
        } 
    });

    const result = await fgaClient.check({
        user,
        relation,
        object,
    });

    return result;

}

export async function listAllTuples(token: string, payload: FGAListTuple) {
    const { user, relation, type } = payload;

    const fgaClient = new OpenFgaClient({
        apiHost: process.env.FGA_API_HOST || '',
        storeId: process.env.FGA_STORE_ID,
        credentials: {
            method: CredentialsMethod.ApiToken,
            config: {
                token: token,
            }
        } 
    });

    const result = await fgaClient.listObjects({
        user,
        relation,
        type,
    });

    return result;
}

export type FGAWriteTuple = {
    user: string,
    object: string,
    relation: string
}

export type FGACheckTuple = {
    user: string,
    object: string,
    relation: string
}

export type FGAListTuple = {
    user: string,
    relation: string,
    type: string
}