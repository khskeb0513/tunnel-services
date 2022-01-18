import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NgrokTunnelRepository } from './repository/ngrok-tunnel.repository';
import { NgrokConfigService } from './ngrok-config.service';
import { Protocol, Region } from 'dto';
import { CreateNgrokTunnelDto } from './dto/create-ngrok-tunnel.dto';
import { UpdateNgrokTunnelDto } from './dto/update-ngrok-tunnel.dto';
import { ResponseNgrokTunnelDto } from './dto/response-ngrok-tunnel.dto';
import { NgrokStatusService } from './ngrok-status.service';

@Injectable()
export class NgrokTunnelService {
  constructor(
    @InjectRepository(NgrokTunnelRepository)
    private readonly ngrokTunnelRepository: NgrokTunnelRepository,
    private readonly ngrokConfigService: NgrokConfigService,
    @Inject(forwardRef(() => NgrokStatusService))
    private readonly ngrokStatusService: NgrokStatusService,
  ) {
    this.create({
      name: 'default-for-this-application',
      enabled: true,
      destAddr: '4400',
      region: Region.JP,
      proto: Protocol.TCP,
    });
  }

  public async create(createNgrokTunnelDto: CreateNgrokTunnelDto) {
    const insert = this.ngrokTunnelRepository.create({
      name: createNgrokTunnelDto.name,
      proto: createNgrokTunnelDto.proto,
      enabled: createNgrokTunnelDto.enabled,
      destAddr: createNgrokTunnelDto.destAddr,
      region: createNgrokTunnelDto.region,
    });
    return this.ngrokTunnelRepository.save(insert);
  }

  public async findAll(onlyEnabled?: boolean) {
    const response = await this.ngrokTunnelRepository.find(
      onlyEnabled
        ? {
            where: {
              enabled: true,
            },
          }
        : null,
    );
    return new ResponseNgrokTunnelDto(response);
  }

  public async findOne(id: number) {
    return this.ngrokTunnelRepository.findOne({ where: { id } });
  }

  public async update(id: number, updateNgrokTunnelDto: UpdateNgrokTunnelDto) {
    const update = this.ngrokTunnelRepository.create({
      name: updateNgrokTunnelDto.name,
      proto: updateNgrokTunnelDto.proto,
      region: updateNgrokTunnelDto.region,
      destAddr: updateNgrokTunnelDto.destAddr,
      enabled: updateNgrokTunnelDto.enabled,
    });
    return this.ngrokTunnelRepository.update({ id }, update);
  }

  public async updateRemoteAddr(id: number, remoteAddr: string) {
    const update = this.ngrokTunnelRepository.create({
      remoteAddr,
    });
    return this.ngrokTunnelRepository.update({ id }, update);
  }

  public async removeAddRemoteAddr() {
    return this.ngrokTunnelRepository
      .createQueryBuilder()
      .update({ remoteAddr: null })
      .execute();
  }

  public async remove(id: number) {
    await this.ngrokStatusService.stop(id);
    return this.ngrokTunnelRepository.delete({ id });
  }

  public async findDefaultTunnel() {
    return this.ngrokTunnelRepository.findOne({
      name: 'default-for-this-application',
    });
  }
}
