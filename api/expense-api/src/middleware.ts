import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/utils/token_utils';

export const config = {
    matcher: '/api/fga-check',
};

export default async function middleware(req: NextRequest) {
    const token = req.headers.get('authorization')?.split(' ')[1];
    let response = null;
    try {
        if (token) {
            const isPayloadValid = await verifyJWT(token);
            if (isPayloadValid) {
                response = NextResponse.next();
            } else {
                response = NextResponse.json({ message: 'Authorization Required'}, { status: 401 });
            }
        } else {
            response = NextResponse.json({ message: 'Authorization Required'}, { status: 401 });
        }
        return response;
    } catch (e) {
        return NextResponse.json({ message: e }, { status: 401 })
    }
}