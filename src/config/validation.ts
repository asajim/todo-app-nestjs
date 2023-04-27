import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  PORT: Joi.number().required(),
  AUTH_USERNAME: Joi.string().required(),
  AUTH_PASSWORD: Joi.string().required(),
});
