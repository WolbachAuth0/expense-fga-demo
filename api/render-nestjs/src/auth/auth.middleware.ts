import { Injectable, NestMiddleware } from '@nestjs/common';
import { verifyJWT } from './auth.utils';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: (error?: any) => void) {
    console.log('****this is class middleware*****');
    const token = req.headers.authorization.split('Bearer ')[1];
    console.log(token);
    if (!token) {
      next(new UnauthorizedError());
    }

    const payload = await verifyJWT(token);

    if (!payload) {
      console.log(payload);
      next(new UnauthorizedError());
    } else {
      req.sub = payload.sub;
      req.email = payload.email;
      next();
    }
    //next();
  }
}
