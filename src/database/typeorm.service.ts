import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      logging: true,
      entities: ['dist/**/*.entity.js'],
      logger: 'advanced-console',
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      ssl: this.configService.get('DB_SSL_CERTIFICATE')
        ? {
            rejectUnauthorized: false,
            ca: this.configService.get('DB_SSL_CERTIFICATE'),
          }
        : false,
    };
  }
}
