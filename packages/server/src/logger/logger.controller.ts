import { Controller, Get, Param, Redirect, Render } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ResponseLoggerDto } from './dto/response-logger.dto';

@Controller('/logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get('/')
  @Redirect('/logger/1')
  public async index() {
    return;
  }

  @Get('/:page')
  @Render('logger/Logs')
  public async logs(@Param('page') page: string): Promise<ResponseLoggerDto> {
    return this.loggerService.logs(+page);
  }
}
