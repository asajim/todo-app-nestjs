import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

/**
 * @class BasicAuthGuard
 * @implements CanActivate
 *
 * A guard that protects routes in the application by requiring authentication with a username and password
 * stored in the configService.
 *
 * @param {ConfigService} configService - A service that provides access to the application's configuration.
 *
 * @throws {UnauthorizedException} When the provided authentication header is missing or invalid.
 */
@Injectable()
export class BasicAuthGuard implements CanActivate {
  private readonly encodedUsernamePassword: string;

  constructor(configService: ConfigService) {
    const username = configService.getOrThrow('auth.username');
    const password = configService.getOrThrow('auth.password');

    this.encodedUsernamePassword = Buffer.from(
      `${username}:${password}`,
    ).toString('base64');
  }

  /**
   * Determines whether the route can be activated (true when the header has valid authentication value).
   *
   * @param {ExecutionContext} context - The context for the current request.
   *
   * @returns {boolean | Promise<boolean> | Observable<boolean>} Whether the route can be activated.
   *
   * @throws {UnauthorizedException} When the provided authentication header is missing or invalid.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const header = context.switchToHttp().getRequest().headers;

    const { authorization } = header;
    if (!authorization) {
      throw new UnauthorizedException();
    }
    const splitAuthorization = authorization.split('Basic ');
    if (splitAuthorization.length !== 2) {
      throw new UnauthorizedException();
    }
    const token = splitAuthorization[1];
    if (token !== this.encodedUsernamePassword) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
