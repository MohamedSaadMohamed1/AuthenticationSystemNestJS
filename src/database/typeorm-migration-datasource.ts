import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'typeorm_migrations',
  logger: 'advanced-console',
  ssl: process.env.DB_SSL_CERTIFICATE
    ? {
        rejectUnauthorized: false,
        ca: process.env.DB_SSL_CERTIFICATE,
      }
    : false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
