import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envValidationSchema from './env-validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
  ],
})
export class MyConfigModule {}
