import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/utils/token_utils';

export const config = {
    matcher: '/api/fga-check',
};

export default async function middleware(req: NextRequest) {
    const token = req.headers.get('authorization')?.split(' ')[1];
    try {
        if (token && await verifyJWT(token)) {
            return NextResponse.next();
        }
    } catch (e) {
        return NextResponse.json({ message: e }, { status: 401 })
    }
}