import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseResolver } from './response.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseRepository } from './response.repository';
import { OptionRepository } from '../option/option.repository';
import { Response } from './entities/response.entity';
import { Option } from '../option/entities/option.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Response, Option])],
  providers: [
    ResponseResolver,
    ResponseService,
    ResponseRepository,
    OptionRepository,
  ],
})
export class ResponseModule {}
