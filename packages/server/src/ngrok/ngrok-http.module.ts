import { forwardRef, Module } from '@nestjs/common';
import { NgrokTunnelService } from './ngrok-tunnel.service';
import { NgrokTunnelController } from './ngrok-tunnel.controller';
import { NgrokModule } from './ngrok.module';
import { NgrokConfigController } from './ngrok-config.controller';
import { NgrokConfigService } from './ngrok-config.service';
import { NgrokStatusService } from './ngrok-status.service';
import { NgrokStatusController } from './ngrok-status.controller';
import { LoggerHttpModule } from '../logger/logger-http.module';

@Module({
  controllers: [
    NgrokConfigController,
    NgrokStatusController,
    NgrokTunnelController,
  ],
  providers: [NgrokTunnelService, NgrokConfigService, NgrokStatusService],
  imports: [NgrokModule, LoggerHttpModule],
})
export class NgrokHttpModule {}
