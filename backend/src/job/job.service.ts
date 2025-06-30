import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AddJobDto, UpdateJobDto } from './dto/dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'src/database/schemas/Job.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  // Method to add a job
  addJob(addJobDto: AddJobDto) {
    const newJob = new this.jobModel({
      companyName: addJobDto.companyName,
      jobTitle: addJobDto.jobTitle,
      status: addJobDto.status,
      location: addJobDto.location,
      description: addJobDto.description,
      author: addJobDto.author,
    });

    return newJob.save();
  }

  //Method to fetch all jobs
  async getJobs(id: string) {
    const jobs = await this.jobModel
      .find({ author: new Types.ObjectId(id) })
      .exec();
    return jobs;
  }

  // Method to update a job
  async updateJob(id: string, updateJobDto: UpdateJobDto) {
    try {
      // Validate if id is a correct MongoDB ObjectId
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return new BadRequestException(`Invalid ID: ${id}`);
      }

      const prevDta = await this.jobModel.findById(id);
      if (!prevDta) {
        return new NotFoundException(`Job with id ${id} not found`);
      }
      const updatedJob = await this.jobModel.findByIdAndUpdate(
        id,
        {
          companyName:
            updateJobDto?.companyName !== ''
              ? updateJobDto?.companyName
              : prevDta.companyName,
          status:
            updateJobDto?.status !== '' ? updateJobDto?.status : prevDta.status,
          jobTitle:
            updateJobDto?.jobTitle !== ''
              ? updateJobDto?.jobTitle
              : prevDta.jobTitle,
          location:
            updateJobDto?.location !== ''
              ? updateJobDto?.location
              : prevDta.location,
          description:
            updateJobDto?.description !== ''
              ? updateJobDto?.description
              : prevDta.description,
        },
        { new: true },
      );

      return { message: 'Job updated successfully' };
    } catch (error) {
      throw new Error(`Error updating job with id ${id}: ${error.message}`);
    }
  }

  //Method to delete
  async deleteJob(id: string) {
    try {
      const deletedId = await this.jobModel.findByIdAndDelete(id);
      if (!deletedId)
        return new NotFoundException(`Job with id ${id} not found`);

      return { message: 'Job deleted successfully' };
    } catch (error) {
      throw new Error(`Error in deleting id ${id}: ${error.message}`);
    }
  }
}
