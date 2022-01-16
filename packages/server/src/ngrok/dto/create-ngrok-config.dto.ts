import { ApiProperty } from '@nestjs/swagger';
import { CreateNgrokConfigProps, NgrokConfigKey } from 'dto';

export class CreateNgrokConfigDto implements CreateNgrokConfigProps {
  @ApiProperty({ enum: NgrokConfigKey })
  key: NgrokConfigKey;

  @ApiProperty()
  value: string;
}
