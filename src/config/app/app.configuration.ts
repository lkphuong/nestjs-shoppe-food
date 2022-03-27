import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  port: process.env.PORT,
  host: process.env.HOST,
  database_port: process.env.DATABASE_PORT,
  name: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  secret_key: process.env.SECRET_KEY,
  expires_in: process.env.EXPIRES_IN,
  expires_in_refresh: process.env.EXPIRES_IN_REFRESH,
  salt: process.env.SALT,
}));
