import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NgrokConfigKey } from 'dto';

@Entity()
export class NgrokConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: NgrokConfigKey, type: 'text', unique: true })
  key: NgrokConfigKey;

  @Column({ nullable: true })
  value: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'modified_at', nullable: true })
  modifiedAt: string;
}
