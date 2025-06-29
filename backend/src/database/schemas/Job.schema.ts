import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  jobTitle: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: mongoose.Types.ObjectId;

  //optional fields
  @Prop({ isRequired: false })
  location?: string;

  @Prop({ isRequired: false })
  description?: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
