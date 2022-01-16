import { Protocol, Region } from '../enum';

export interface ResponseNgrokTunnel {
  id: number;
  name: string;
  proto: Protocol;
  destAddr: string;
  region: Region;
  remoteAddr: string;
  enabled: boolean;
}

export interface ResponseNgrokTunnelProps {
  tunnels: ResponseNgrokTunnel[];
}
