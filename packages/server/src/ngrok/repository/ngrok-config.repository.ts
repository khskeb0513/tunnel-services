import {
  EntityRepository,
  FindConditions,
  ObjectID,
  Repository,
  UpdateResult,
} from 'typeorm';
import { NgrokConfig } from '../entity/ngrok-config.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { NgrokConfigKey } from 'dto';

@EntityRepository(NgrokConfig)
export class NgrokConfigRepository extends Repository<NgrokConfig> {
  public async findByKey(key: NgrokConfigKey) {
    return this.findOne({
      where: {
        key,
      },
    });
  }

  public async deleteByKey(key: NgrokConfigKey) {
    return this.delete({
      key,
    });
  }

  update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<NgrokConfig>,
    partialEntity: QueryDeepPartialEntity<NgrokConfig>,
  ): Promise<UpdateResult> {
    return super.update(
      Object.keys(partialEntity).length === 0 ? '1 != 1' : criteria,
      partialEntity,
    );
  }
}
