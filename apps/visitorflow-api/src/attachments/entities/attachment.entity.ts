import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Visit } from '../../visits/entities/visit.entity';

export enum AttachmentType {
  SELFIE = 'SELFIE',
  VEHICLE = 'VEHICLE',
  PARCEL = 'PARCEL',
}

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Visit)
  @JoinColumn({ name: 'visit_id' })
  visit: Visit;

  @Column({
    type: 'enum',
    enum: AttachmentType,
  })
  type: AttachmentType;

  @Column()
  url: string;

  @Column()
  bucket: string;

  @Column()
  key: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
