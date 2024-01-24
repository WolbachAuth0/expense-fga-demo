import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/utils/token_utils';

export const config = {
    matcher: '/api/:path*'
}

export default async function middleware(req: NextRequest) {
    const response = NextResponse.next();
    
    // Set default CORS headers
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
    response.headers.set("Access-Control-Allow-Origin", "*");

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (token && await verifyJWT(token)) {
        return NextResponse.next();
    }
    return NextResponse.json({ message: 'Authorization Required'}, { status: 401 });
}