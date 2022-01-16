import {
  EntityRepository,
  FindConditions,
  ObjectID,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { NgrokTunnel } from '../entity/ngrok-tunnel.entity';

@EntityRepository(NgrokTunnel)
export class NgrokTunnelRepository extends Repository<NgrokTunnel> {
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
      | FindConditions<NgrokTunnel>,
    partialEntity: QueryDeepPartialEntity<NgrokTunnel>,
  ): Promise<UpdateResult> {
    return super.update(
      Object.keys(partialEntity).length === 0 ? '1 != 1' : criteria,
      partialEntity,
    );
  }
}
