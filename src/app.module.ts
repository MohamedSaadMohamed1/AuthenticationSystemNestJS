import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from 'Api/auth/auth.module';
import { UsersModule } from 'Api/users/users.module';
import { MyConfigModule } from 'Config/env/my-config.module';
import { MyLoggerModule } from 'Config/logger/my-logger.module';
import { SwaggerService } from 'Config/swagger/swagger.service';
import { ResponseInterceptor } from 'Helpers/interceptors/response.interceptor';
import { EntityNotFoundExceptionFilter } from 'Helpers/exceptions/entity-not-found-exception.filter';

@Module({
  imports: [
    MyConfigModule,
    MyLoggerModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SwaggerService,
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
