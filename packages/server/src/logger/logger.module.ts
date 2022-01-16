import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerRepository } from './repository/logger.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LoggerRepository])],
  exports: [TypeOrmModule],
})
export class LoggerModule {}
