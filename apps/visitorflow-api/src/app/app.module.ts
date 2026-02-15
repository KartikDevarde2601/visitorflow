import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { VisitorsModule } from '../visitors/visitors.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig()),
    UsersModule,
    VisitorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
