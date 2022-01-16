import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NgrokConfigRepository } from './repository/ngrok-config.repository';
import { NgrokTunnelRepository } from './repository/ngrok-tunnel.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([NgrokConfigRepository, NgrokTunnelRepository]),
  ],
  exports: [TypeOrmModule],
})
export class NgrokModule {}
