import { Injectable, NestMiddleware } from '@nestjs/common';
import { verifyJWT } from './auth.utils';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers?.authorization?.split('Bearer ')[1];
    console.log(token);
    if (!token) {
      next(new UnauthorizedError('Token missing'));
    }

    const payload = await verifyJWT(token);

    if (!payload) {
      console.log(payload);
      next(new UnauthorizedError('Token validation error'));
    } else {
      req.sub = payload.sub;
      req.email = payload.email;
      next();
    }
  }
}
