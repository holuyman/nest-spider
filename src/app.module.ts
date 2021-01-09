import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskService } from './task/task.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule { }
