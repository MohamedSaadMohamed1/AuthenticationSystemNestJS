import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          logging: true,
          entities: ['dist/**/*.entity.js'],
          logger: 'advanced-console',
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
          ssl: configService.get('DB_SSL_CERTIFICATE')
            ? {
                rejectUnauthorized: false,
                ca: configService.get('DB_SSL_CERTIFICATE'),
              }
            : false,
          timezone: 'Z',
        } as TypeOrmModuleAsyncOptions;
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return addTransactionalDataSource(dataSource);
      },
    }),
  ],
})
export class DatabaseModule {}
