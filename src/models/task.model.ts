import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
}

const taskSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false, default: '' },
        completed: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
