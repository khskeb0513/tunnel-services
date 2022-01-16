import { CreateNgrokTunnelProps, Protocol, Region } from 'dto';

export class CreateNgrokTunnelDto implements CreateNgrokTunnelProps {
  destAddr: string;
  enabled = true;
  name: string;
  proto: Protocol = Protocol.TCP;
  region: Region = Region.JP;
}
