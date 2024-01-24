import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/utils/token_utils';
import cors from './utils/cors';

export const config = {
    matcher: '/api/:path*'
}

export default async function middleware(req: NextRequest, res: NextResponse) {
    let response = null;

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (token && await verifyJWT(token)) {
        return NextResponse.next();
    } else {
        response = NextResponse.json({ message: 'Authorization Required'}, { status: 401 });
    }
    
    return cors(req, res);
}