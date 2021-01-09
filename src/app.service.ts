import { Injectable } from '@nestjs/common';
import { TaskService } from './task/task.service'

@Injectable()
export class AppService {
  constructor(
    private readonly taskService: TaskService
  ) {

  }
  getHello() {
    return this.taskService.getProduct();
  }
}
