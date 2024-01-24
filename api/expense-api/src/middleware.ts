import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/utils/token_utils';
import { setCorsMiddlewareHeaders } from './utils/header_utils';

export const config = {
    matcher: '/api/:path*'
}

export default async function middleware(req: NextRequest, res: NextResponse) {
    if (req.method === 'OPTIONS') {
        return setCorsMiddlewareHeaders(res).ok;
    }

    const response = NextResponse.next();

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (token && await verifyJWT(token)) {
        return setCorsMiddlewareHeaders(response);
    }

    const authFailedResponse = NextResponse.json({ message: 'Authorization Required'}, { status: 401 })
    return setCorsMiddlewareHeaders(authFailedResponse);
}