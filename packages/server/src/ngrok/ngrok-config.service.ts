import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NgrokConfigRepository } from './repository/ngrok-config.repository';
import { CreateNgrokConfigDto } from './dto/create-ngrok-config.dto';
import { NgrokConfigKey } from 'dto';
import { UpdateNgrokConfigDto } from './dto/update-ngrok-config.dto';
import { ResponseNgrokConfigDto } from './dto/response-ngrok-config.dto';

@Injectable()
export class NgrokConfigService {
  constructor(
    @InjectRepository(NgrokConfigRepository)
    private readonly ngrokConfigRepository: NgrokConfigRepository,
  ) {
    this.create({
      key: NgrokConfigKey.AUTH_TOKEN,
      value: '',
    });
  }

  public async create(createNgrokConfigDto: CreateNgrokConfigDto) {
    const insert = this.ngrokConfigRepository.create({
      key: createNgrokConfigDto.key,
      value: createNgrokConfigDto.value,
    });
    return this.ngrokConfigRepository.save(insert);
  }

  public async findAll() {
    const response = await this.ngrokConfigRepository.find();
    return new ResponseNgrokConfigDto(response);
  }

  public async findOneByKey(key: NgrokConfigKey) {
    return this.ngrokConfigRepository.findByKey(key);
  }

  public async update(
    key: NgrokConfigKey,
    updateNgrokConfigDto: UpdateNgrokConfigDto,
  ) {
    const update = this.ngrokConfigRepository.create({
      value: updateNgrokConfigDto.value,
    });
    return this.ngrokConfigRepository.update({ key }, update);
  }

  public async remove(key: NgrokConfigKey) {
    return this.ngrokConfigRepository.delete(key);
  }
}
