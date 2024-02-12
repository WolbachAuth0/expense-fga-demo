import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/utils/token_utils';
import { cors } from './utils/cors';

export const config = {
    matcher: '/api/:path*'
}

export default async function middleware(req: NextRequest, res: NextResponse) {

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (token) {
        const decoded_token = await verifyJWT(token);
        if (decoded_token && decoded_token.sub) {
            res = NextResponse.next();
            res.headers.set('extracted-requester-id', decoded_token.sub);
        }
    } else {
        res = NextResponse.json({ message: 'Authorization Required'}, { status: 401 });
    }

    return cors(req, res);
}