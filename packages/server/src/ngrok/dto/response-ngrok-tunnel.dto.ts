import { ResponseNgrokTunnel, ResponseNgrokTunnelProps } from 'dto';
import { NgrokTunnel } from '../entity/ngrok-tunnel.entity';

export class ResponseNgrokTunnelDto implements ResponseNgrokTunnelProps {
  constructor(ngrokTunnels?: NgrokTunnel[]) {
    ngrokTunnels.forEach((ngrokTunnel) => {
      this.tunnels.push({
        name: ngrokTunnel.name,
        proto: ngrokTunnel.proto,
        region: ngrokTunnel.region,
        destAddr: ngrokTunnel.destAddr,
        enabled: ngrokTunnel.enabled,
        id: ngrokTunnel.id,
        remoteAddr: ngrokTunnel.remoteAddr,
      });
    });
    return this;
  }

  tunnels: ResponseNgrokTunnel[] = [];
}
