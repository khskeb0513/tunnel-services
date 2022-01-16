import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobTag, TargetTag } from 'dto';

@Entity()
export class Logger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'connection_id', nullable: true })
  connectionId: number;

  @Column({ name: 'is_error' })
  isError: boolean;

  @Column({ enum: JobTag, name: 'job_tag', type: 'text' })
  jobTag: JobTag;

  @Column({
    enum: TargetTag,
    name: 'target_tag',
    type: 'text',
  })
  targetTag: TargetTag;

  @Column({ nullable: true })
  context: string;

  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  stack: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
