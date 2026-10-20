import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const expectedToken = process.env.AUTH_SECRET_TOKEN || 'sk-company-telemetry-token-123';

    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      throw new UnauthorizedException('Token autentikasi tidak valid');
    }
    return true;
  }
}