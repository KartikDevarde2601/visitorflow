import { DataSource } from 'typeorm';
import { databaseConfig } from './database.config';

// Load environment variables manually if not using NestJS ConfigModule here (which we aren't for CLI)
import * as dotenv from 'dotenv';
dotenv.config();

const config = databaseConfig();

export default new DataSource({
  ...config,
  type: 'postgres', // Ensure type is explicitly set as postgres
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
} as any);
