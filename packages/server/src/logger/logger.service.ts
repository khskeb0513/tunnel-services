import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerRepository } from './repository/logger.repository';
import { ResponseLoggerDto } from './dto/response-logger.dto';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(LoggerRepository)
    private readonly loggerRepository: LoggerRepository,
  ) {}

  public async findAll(start?: number, end?: number) {
    const request = this.loggerRepository.createQueryBuilder();
    if (start) {
      request.where('id >= :start', {
        start,
      });
    }
    if (end) {
      request.andWhere('id <= :end', {
        end,
      });
    }
    return request.orderBy('id', 'ASC').getMany();
  }

  public async logs(page?: number): Promise<ResponseLoggerDto> {
    const logs = isNaN(page)
      ? await this.findAll()
      : await this.findAll((page - 1) * 30, (page - 1) * 30 + 29);
    return {
      length: await this.loggerRepository.count(),
      logs,
    };
  }
}
