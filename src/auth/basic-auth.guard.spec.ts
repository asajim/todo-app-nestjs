import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BasicAuthGuard } from './basic-auth-guard.service';
import { UnauthorizedException } from '@nestjs/common';

describe('BasicAuthGuard', () => {
  let guard: BasicAuthGuard;

  const getContext = (username: string, password: string) => {
    const encodedUsernamePassword = Buffer.from(
      `${username}:${password}`,
    ).toString('base64');

    return {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: `Basic ${encodedUsernamePassword}`,
          },
        }),
      })),
    } as any;
  };

  const mockConfigService: Partial<ConfigService> = {
    getOrThrow<T = any>(propertyPath: any): Exclude<T, undefined> {
      return propertyPath;
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        BasicAuthGuard,
      ],
    }).compile();

    guard = module.get<BasicAuthGuard>(BasicAuthGuard);
  });

  it('should throw UnauthorizedException when token is not valid', async () => {
    await expect(() =>
      guard.canActivate(getContext('username.', 'pass.')),
    ).toThrow(UnauthorizedException);
  });

  it('should be valid when token is valid', async () => {
    await expect(() =>
      // This username and password would be valid because the mock configService will return
      // the parameter name if you ask for a value (used in guard constructor using 'configService.getOrThrow')
      guard.canActivate(getContext('auth.username', 'auth.password')),
    ).toBeTruthy();
  });
});
