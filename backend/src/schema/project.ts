import mongoose from "mongoose";
import {MessageModel} from "./message";

export interface ProjectModel extends mongoose.Document {
    title: string;
    description: string;
    editable_file: string;
    non_editable_file: string;
    user_id: string;
    status: Status;
    deployment_link?: string;
    messages: MessageModel[];
    last_edited: Date;
}

type Status = 'DEPOLOYED' | 'NOTDEPLOYED'

const projectSchema = new mongoose.Schema<ProjectModel>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    editable_file: {
        type: String,
        required: true,
    },
    non_editable_file: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    last_edited: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    deployment_link: {
        type: String,
        required: true,
        default: null,
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true,
        default: [],
    }]
})

projectSchema.index({ user_id: 'text' });
export const Project = mongoose.model('Project', projectSchema);

