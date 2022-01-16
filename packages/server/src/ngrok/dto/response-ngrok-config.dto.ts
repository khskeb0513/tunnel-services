import { ResponseNgrokConfig, ResponseNgrokConfigProps } from 'dto';
import { NgrokConfig } from '../entity/ngrok-config.entity';

export class ResponseNgrokConfigDto implements ResponseNgrokConfigProps {
  constructor(ngrokConfigs?: NgrokConfig[]) {
    ngrokConfigs.forEach((ngrokConfig) => {
      this.configs.push({
        key: ngrokConfig.key,
        value: ngrokConfig.value,
        id: ngrokConfig.id,
      });
    });
  }
  configs: ResponseNgrokConfig[] = [];
}
