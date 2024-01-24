import { NextResponse } from 'next/server';
import { NextApiResponse } from 'next';

export function setCorsMiddlewareHeaders(response: NextResponse) {
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
}

export function setCorsApiHeaders(response: NextApiResponse) {
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT,OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
    response.setHeader("Access-Control-Allow-Origin", "*");
    return response;
}