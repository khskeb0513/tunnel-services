import {
  Protocol,
  Region,
  ResponseNgrokTunnel,
  UpdateNgrokTunnelProps,
} from 'dto';

export class UpdateNgrokTunnelDto implements UpdateNgrokTunnelProps {
  constructor(responseNgrokTunnel?: ResponseNgrokTunnel) {
    if (responseNgrokTunnel) {
      this.destAddr = responseNgrokTunnel.destAddr;
      this.enabled = responseNgrokTunnel.enabled;
      this.name = responseNgrokTunnel.name;
      this.proto = responseNgrokTunnel.proto;
      this.region = responseNgrokTunnel.region;
    }
  }
  destAddr: string;
  enabled: boolean;
  name: string;
  proto: Protocol;
  region: Region;
}
