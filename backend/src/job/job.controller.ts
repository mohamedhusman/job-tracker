import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JobService } from './job.service';
import { AddJobDto, UpdateJobDto } from './dto/dtos';

@Controller('api/job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post('addjob')
  addJob(@Body(new ValidationPipe()) addJobDto: AddJobDto) {
    return this.jobService.addJob(addJobDto);
  }

  @Get('getjobs')
  getJobs() {
    return this.jobService.getJobs();
  }

  @Patch('updatejob/:id')
  updateJob(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateJobDto: UpdateJobDto,
  ) {
    return this.jobService.updateJob(id, updateJobDto);
  }

  @Delete('deletejob/:id')
  deleteJob(@Param('id') id: string) {
    // Logic to delete a job
    return this.jobService.deleteJob(id);
  }
}
