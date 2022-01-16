import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Protocol, Region } from 'dto';

@Entity()
export class NgrokTunnel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ enum: Protocol, type: 'text' })
  proto: Protocol;

  @Column({ name: 'dest_addr' })
  destAddr: string;

  @Column({ enum: Region, type: 'text' })
  region: Region;

  @Column({ name: 'remote_addr', nullable: true })
  remoteAddr: string;

  @Column()
  enabled: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modified_at', nullable: true })
  modifiedAt: Date;
}
