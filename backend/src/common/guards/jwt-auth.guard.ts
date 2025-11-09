import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JWT_STRATEGY } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY) {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
      this.logger.warn('No authorization header found');
      return super.canActivate(context);
    }

    // Log token info for debugging (first 20 chars only for security)
    const tokenPreview = authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7, 27) + '...' 
      : authHeader.substring(0, 20) + '...';
    this.logger.log(`JWT Auth check for ${request.method} ${request.url}, token: ${tokenPreview}`);
    
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      const errorMessage = err?.message || info?.message || 'Unknown error';
      this.logger.error(`JWT Auth failed: ${errorMessage}`);
      
      // Log more details for debugging
      if (info) {
        this.logger.error(`JWT Auth info: ${JSON.stringify(info)}`);
      }
      if (err) {
        this.logger.error(`JWT Auth error: ${JSON.stringify(err)}`);
      }
      
      // Return proper UnauthorizedException instead of generic Error
      throw new UnauthorizedException(errorMessage);
    }
    return user;
  }
}

