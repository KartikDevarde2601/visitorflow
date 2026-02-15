import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Visitor } from '../../visitors/entities/visitor.entity';
import { User } from '../../users/entities/user.entity';

export enum VisitStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ENTERED = 'ENTERED',
  EXITED = 'EXITED',
  CANCELLED = 'CANCELLED',
}

@Entity('visits')
export class Visit {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Visitor)
  @JoinColumn({ name: 'visitor_id' })
  visitor!: Visitor;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'host_id' })
  host?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'guard_id' })
  guard?: User;

  @Column({
    type: 'enum',
    enum: VisitStatus,
    default: VisitStatus.PENDING,
  })
  status!: VisitStatus;

  @Column()
  purpose!: string;

  @Column({ type: 'timestamp', nullable: true })
  entryTime?: Date;

  @Column({ type: 'timestamp', nullable: true })
  exitTime?: Date;

  @Column({ type: 'timestamp' })
  expectedTime!: Date;

  @Column({ nullable: true })
  qrCodeHash?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
