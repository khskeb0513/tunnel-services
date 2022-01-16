import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { NgrokTunnelService } from './ngrok-tunnel.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNgrokTunnelDto } from './dto/create-ngrok-tunnel.dto';
import { UpdateNgrokTunnelDto } from './dto/update-ngrok-tunnel.dto';
import { ResponseNgrokTunnelDto } from './dto/response-ngrok-tunnel.dto';
import { ResponseNgrokConfigDto } from './dto/response-ngrok-config.dto';
import { NgrokConfigService } from './ngrok-config.service';

@ApiTags('ngrok-tunnel')
@Controller('/ngrok-tunnel')
export class NgrokTunnelController {
  constructor(
    private readonly ngrokTunnelService: NgrokTunnelService,
    private readonly ngrokConfigService: NgrokConfigService,
  ) {}

  @Post('/')
  public async create(@Body() createNgrokTunnelDto: CreateNgrokTunnelDto) {
    return this.ngrokTunnelService.create(createNgrokTunnelDto);
  }

  @Get('/')
  @Render('ngrok-tunnel/Connections')
  public async index(): Promise<
    ResponseNgrokTunnelDto & ResponseNgrokConfigDto
  > {
    return {
      ...(await this.ngrokTunnelService.findAll()),
      ...(await this.ngrokConfigService.findAll()),
    };
  }

  @Get('/:id')
  public async findOne(@Param('id') id: string) {
    return this.ngrokTunnelService.findOne(+id);
  }

  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateNgrokTunnelDto: UpdateNgrokTunnelDto,
  ) {
    return this.ngrokTunnelService.update(+id, updateNgrokTunnelDto);
  }

  @Delete('/:id')
  public async remove(@Param('id') id: string) {
    return this.ngrokTunnelService.remove(+id);
  }
}
