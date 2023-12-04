import { Repository } from 'typeorm';
import {
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

export function handleServiceError(
  logger: Logger,
  error: Error,
  customErrorMessage: string,
) {
  logger.error(`${error}`);
  if (error instanceof NotFoundException) {
    throw error;
  } else {
    throw new InternalServerErrorException(customErrorMessage);
  }
}

export async function checkEntity(repository, id: number, entityName: string) {
  const entity = await repository.findById(id);
  if (!entity) {
    throw new NotFoundException(`해당 id의 ${entityName}이/가 없습니다.`);
  }
  return entity;
}
