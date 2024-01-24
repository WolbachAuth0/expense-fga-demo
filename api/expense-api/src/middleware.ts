import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/utils/token_utils';

export const config = {
    matcher: '/api/:path*'
}

export default async function middleware(req: NextRequest, res: NextResponse) {
    if (req.method === 'OPTIONS') {
        return res.ok;
    }

    const response = NextResponse.next();

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (token && await verifyJWT(token)) {
        return setCorsHeaders(response);
    }

    const authFailedResponse = NextResponse.json({ message: 'Authorization Required'}, { status: 401 })
    return setCorsHeaders(authFailedResponse);
}

function setCorsHeaders(response: NextResponse) {
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
}