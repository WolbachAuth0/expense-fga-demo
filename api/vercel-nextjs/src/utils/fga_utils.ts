import { OpenFgaClient, CredentialsMethod } from '@openfga/sdk';


function initializeFGAClient (token: string) : OpenFgaClient {
    const fgaClient = new OpenFgaClient({
        apiHost: process.env.FGA_API_HOST || '',
        storeId: process.env.FGA_STORE_ID,
        authorizationModelId: process.env.FGA_MODEL_ID || undefined,
        credentials: {
            method: CredentialsMethod.ApiToken,
            config: {
                token: token,
            }
        } 
    });
    return fgaClient
}

export async function writeTuple(token: string, payload: FGAWriteTuple) {
    const { user, object, relation } = payload;
    
    const fgaClient = initializeFGAClient(token);

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
    
    const fgaClient = initializeFGAClient(token);

    const result = await fgaClient.check({
        user,
        relation,
        object,
    });

    return result;
}

export async function listAllTuples(token: string, payload: FGAListTuple) {
    const { user, relation, type } = payload;

    const fgaClient = initializeFGAClient(token);

    const result = await fgaClient.listObjects({
        user,
        relation,
        type,
    });

    return result;
}

export async function deleteTuple(token: string, payload: FGADeleteTuple) {
    const { user, relation, object } = payload;

    const fgaClient = initializeFGAClient(token);

    const result = await fgaClient.write({
        deletes: [{
            user,
            relation,
            object,
        }]
    })
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

export type FGADeleteTuple = {
    user: string,
    relation: string,
    object: string
}