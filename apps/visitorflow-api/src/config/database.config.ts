import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Attachment } from '../attachments/entities/attachment.entity';
import { User } from '../users/entities/user.entity';
import { Visitor } from '../visitors/entities/visitor.entity';
import { Visit } from '../visits/entities/visit.entity';

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'visitorflow',
  entities: [Attachment, User, Visitor, Visit],
  synchronize: process.env.NODE_ENV !== 'production', // true for dev, false for prod
});
