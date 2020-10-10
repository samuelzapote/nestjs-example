import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTasksWithFilters(filterDto: GetTasksFilterDto):  Task[] {
    const {status, search} = filterDto;
    let tasks = this.getAllTasks();
    if (status) { tasks = tasks.filter(task => task.status === status); }
    if (search) { tasks = tasks.filter(task => task.description.contains(search)); }
    return tasks;
  }

  public getTaskById(id: string): Task {
    return this.tasks.find(t => t.id === id);
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task);
    return task;
  }

  public updateTaskStatusById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  public deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
