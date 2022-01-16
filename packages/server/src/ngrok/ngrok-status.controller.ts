import { Controller, Delete, Get, Param } from '@nestjs/common';
import { NgrokStatusService } from './ngrok-status.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ngrok-tunnel')
@Controller('/ngrok-tunnel/status')
export class NgrokStatusController {
  constructor(private readonly ngrokStatusService: NgrokStatusService) {}

  @Get('/:id')
  public async start(@Param('id') id: string) {
    return this.ngrokStatusService.start(+id);
  }

  @Get('/')
  public async startAll() {
    return this.ngrokStatusService.startRoutine();
  }

  @Delete('/')
  public async stopAll() {
    return this.ngrokStatusService.stopRoutine();
  }

  @Delete('/:id')
  public async stop(@Param('id') id: string) {
    return this.ngrokStatusService.stop(+id);
  }
}
