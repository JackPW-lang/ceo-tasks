import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks') // All routes prefixed with /tasks
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get() // GET /tasks - retrieve all tasks for display
    findAll() {
        return this.tasksService.findAll();
    }

    @Post() // POST /tasks; create a new task, only the title is needed from the client.
    create(@Body('title') title: string) {
        return this.tasksService.create(title);
    }

    @Patch(':id/toggle') // PATCH /tasks/:id/toggle; toggle the completion state w/o the need for request body
    toggle(@Param('id') id: string) {
        return this.tasksService.toggleComplete(id);
    }
}
