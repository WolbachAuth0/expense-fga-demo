import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/utils/token_utils';

export default async function middleware(req: NextRequest) {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (token && await verifyJWT(token)) {
        return NextResponse.next();
    }
    return NextResponse.json({ message: 'Authorization Required'}, { status: 401 });
}