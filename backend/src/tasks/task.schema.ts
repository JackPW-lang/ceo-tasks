import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document; // Combines Task with mongoose's doc type for DB operations

@Schema()
export class Task {
    @Prop({ required: true }) // The task text (required, no empty tasks allowed)
    title: string;

    @Prop({ default : false}) // Defaults to false since every task is initially incomplete
    completed: boolean;
}

// Generates the mongoose schema from the Task class definition.
export const TaskSchema = SchemaFactory.createForClass(Task);