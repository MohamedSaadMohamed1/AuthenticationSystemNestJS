import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { message } = exception as QueryFailedError;

    Logger.error(
      '🚀 ~ file: entity-not-found-exception.filter.ts:11 ~ EntityNotFoundExceptionFilter ~ message:',
      message,
    );
    /**
     * a regex to get the entity name from the message string
     */
    const regex = /(?<=type\s+).*?(?=\s+matching)/gs;
    const regexId = /"id": (\d+)/;

    /**
     * Get the entity name from the message string using regex and convert it to uppercase to match the translation key in the translation file (entity.json)
     */
    const entity = message.match(regex)[0].split('"')[1].toUpperCase();
    const id = message.match(regexId)[1];

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: `Could not find ${entity} with id ${id}`,
    });
  }
}
