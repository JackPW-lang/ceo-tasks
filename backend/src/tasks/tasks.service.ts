import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TasksService {
    // Inject Task model so we can perform DB operations
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}


    async findAll(): Promise<Task[]> { // Fetch all tasks (ceo wants to see everything)
        return this.taskModel.find().exec();
    }

    async create(title: string): Promise<Task> { // Create new task, only need title (completion defaults to false as per the schema)
        const task = new this.taskModel({ title });
        return task.save();
    }

    async toggleComplete(id: string): Promise<Task> { // Toggle the completion status
        const task = await this.taskModel.findById(id);
        if(!task) throw new Error('Task not found.')
        task.completed = !task.completed; // Toggle rather than set -> eliminates need for flag
        return task.save();
    }
}