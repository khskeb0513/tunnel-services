import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { LoggerRepository } from './repository/logger.repository';
import { JobTag, TargetTag } from 'dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  constructor(
    @InjectRepository(LoggerRepository)
    private readonly loggerRepository: LoggerRepository,
  ) {
    super();
  }

  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
    return this.loggerRepository.save({
      context,
      message,
      stack,
      jobTag: JobTag.GLOBAL,
      targetTag: TargetTag.GLOBAL,
      isError: true,
    });
  }

  catchError(
    message: any,
    stack: string,
    context: string,
    jobTag: JobTag,
    targetTag: TargetTag,
    connectionId?: number,
  ) {
    super.error(message, stack, context);
    return this.loggerRepository.save({
      isError: true,
      context,
      stack,
      jobTag,
      targetTag,
      message,
      connectionId,
    });
  }

  catchLog(
    stack: any,
    context: string,
    jobTag: JobTag,
    targetTag: TargetTag,
    connectionId?: number,
  ) {
    super.log(stack, context);
    return this.loggerRepository.save({
      isError: false,
      context,
      jobTag,
      targetTag,
      stack,
      connectionId,
    });
  }
}
