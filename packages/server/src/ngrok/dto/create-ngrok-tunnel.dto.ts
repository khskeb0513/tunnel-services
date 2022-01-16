import { ApiProperty } from '@nestjs/swagger';
import { CreateNgrokTunnelProps, Protocol, Region } from 'dto';

export class CreateNgrokTunnelDto implements CreateNgrokTunnelProps {
  @ApiProperty()
  public name: string;

  @ApiProperty({ enum: Protocol })
  public proto: Protocol = Protocol.TCP;

  @ApiProperty()
  public destAddr: string;

  @ApiProperty({ enum: Region })
  public region: Region = Region.JP;

  @ApiProperty()
  public enabled = true;
}
