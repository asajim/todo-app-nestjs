import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.getOrThrow<string>('DATABASE_HOST'),
      port: this.configService.getOrThrow<number>('DATABASE_PORT'),
      database: this.configService.getOrThrow<string>('DATABASE_NAME'),
      username: this.configService.getOrThrow<string>('DATABASE_USER'),
      password: this.configService.getOrThrow<string>('DATABASE_PASSWORD'),
      autoLoadEntities: true,
      migrations: ['./migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      // TODO: Disable this. Never use TRUE in production!
      synchronize: true,
    };
  }
}
