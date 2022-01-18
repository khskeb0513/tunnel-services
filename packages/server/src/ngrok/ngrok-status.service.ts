import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { NgrokTunnelService } from './ngrok-tunnel.service';
import * as ngrok from 'ngrok';
import { Logger } from '../logger/logger';
import { NgrokConfigService } from './ngrok-config.service';
import { JobTag, NgrokConfigKey, TargetTag } from 'dto';

@Injectable()
export class NgrokStatusService {
  constructor(
    @Inject(forwardRef(() => NgrokTunnelService))
    private readonly ngrokTunnelService: NgrokTunnelService,
    private readonly ngrokConfigService: NgrokConfigService,
    private readonly logger: Logger,
  ) {
    this.ngrokConfigService
      .findOneByKey(NgrokConfigKey.AUTH_TOKEN)
      .then((config) =>
        ngrok.authtoken({
          authtoken: !config ? null : config.value,
        }),
      )
      .then(() => this.ngrokTunnelService.removeAddRemoteAddr())
      .then(() => this.startRoutine())
      .then(() =>
        this.ngrokTunnelService.findDefaultTunnel().then((tunnel) => {
          this.logger.log(
            `Default Ngrok Connection opened: ${tunnel.remoteAddr}`,
            NgrokStatusService.name,
          );
        }),
      );
  }

  public async start(id: number) {
    const connection = await this.ngrokTunnelService.findOne(id);
    if (!!connection.remoteAddr) return;
    return ngrok
      .connect({
        onLogEvent: (e) =>
          this.logger.catchLog(
            e,
            NgrokStatusService.name,
            JobTag.NGROK_TUNNEL,
            TargetTag.NGROK_TUNNEL_NORMAL,
            connection.id,
          ),
        proto: connection.proto,
        addr: connection.destAddr,
        region: connection.region,
      })
      .then((remoteAddr) => {
        this.ngrokTunnelService.updateRemoteAddr(connection.id, remoteAddr);
        return remoteAddr;
      });
  }

  public async startRoutine() {
    const response = await this.ngrokTunnelService.findAll(true);
    return Promise.all(
      response.tunnels
        .filter((tunnel) => !tunnel.remoteAddr)
        .map(async (tunnel) => this.start(tunnel.id)),
    );
  }

  public async stopRoutine() {
    const response = await this.ngrokTunnelService.findAll();
    return Promise.all(
      response.tunnels
        .filter((tunnel) => !!tunnel.remoteAddr)
        .map(async (tunnel) => this.stop(tunnel.id)),
    );
  }

  public async stop(id: number) {
    const response = await this.ngrokTunnelService.findOne(id);
    if (!response.remoteAddr) return;
    if (response.remoteAddr.includes('http')) {
      ngrok
        .disconnect(
          response.remoteAddr.includes('https')
            ? response.remoteAddr.replace('https', 'http')
            : response.remoteAddr.replace('http', 'https'),
        )
        .catch((e) =>
          this.logger.catchError(
            e.message,
            e.stack,
            NgrokStatusService.name,
            JobTag.NGROK_TUNNEL_DISCONNECT,
            TargetTag.NGROK_TUNNEL_DISCONNECT_ERROR,
            id,
          ),
        );
    }
    return ngrok
      .disconnect(response.remoteAddr)
      .catch((e) =>
        this.logger.catchError(
          e.message,
          e.stack,
          NgrokStatusService.name,
          JobTag.NGROK_TUNNEL_DISCONNECT,
          TargetTag.NGROK_TUNNEL_DISCONNECT_ERROR,
          id,
        ),
      )
      .then(() => this.ngrokTunnelService.updateRemoteAddr(id, null));
  }
}
