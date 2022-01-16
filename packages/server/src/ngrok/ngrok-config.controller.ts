import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NgrokConfigService } from './ngrok-config.service';
import { CreateNgrokConfigDto } from './dto/create-ngrok-config.dto';
import { NgrokConfigKey } from 'dto';
import { UpdateNgrokConfigDto } from './dto/update-ngrok-config.dto';

@ApiTags('ngrok-tunnel')
@Controller('/ngrok-tunnel/config')
export class NgrokConfigController {
  constructor(private readonly ngrokConfigService: NgrokConfigService) {}

  @Post('/')
  public async create(@Body() createNgrokConfigDto: CreateNgrokConfigDto) {
    return this.ngrokConfigService.create(createNgrokConfigDto);
  }

  @Get('/')
  public async findAll() {
    return this.ngrokConfigService.findAll();
  }

  @Get('/:key')
  public async findOne(@Param('key') key: NgrokConfigKey) {
    return this.ngrokConfigService.findOneByKey(key);
  }

  @Patch('/:key')
  public async update(
    @Param('key') key: NgrokConfigKey,
    @Body() updateNgrokConfigDto: UpdateNgrokConfigDto,
  ) {
    return this.ngrokConfigService.update(key, updateNgrokConfigDto);
  }

  @Delete('/:key')
  public async remove(@Param('key') key: NgrokConfigKey) {
    return this.ngrokConfigService.remove(key);
  }
}
