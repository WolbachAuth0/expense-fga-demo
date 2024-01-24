import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/utils/token_utils';

export const config = {
    matcher: '/api/:path*'
}

export default async function middleware(req: NextRequest, res: NextResponse) {
    const response = NextResponse.next();

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (token && await verifyJWT(token)) {
        return response;
    }

    return NextResponse.json({ message: 'Authorization Required'}, { status: 401 })
}