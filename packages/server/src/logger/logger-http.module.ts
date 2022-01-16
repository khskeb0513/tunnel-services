import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { Logger } from './logger';
import { LoggerModule } from './logger.module';
import { LoggerService } from './logger.service';

@Module({
  controllers: [LoggerController],
  providers: [Logger, LoggerService],
  imports: [LoggerModule],
  exports: [Logger],
})
export class LoggerHttpModule {}
