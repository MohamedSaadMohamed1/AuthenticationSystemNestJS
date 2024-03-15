import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().required(),
  API_URL: Joi.string().optional(),

  JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRE_AT: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
