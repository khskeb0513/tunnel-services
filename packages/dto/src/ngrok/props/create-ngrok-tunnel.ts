import { Protocol, Region } from '../enum';

export interface CreateNgrokTunnelProps {
  name: string;
  proto: Protocol;
  destAddr: string;
  region: Region;
  enabled: boolean;
}
