import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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

  @Post('getjobs')
  getJobs(@Body() id: string) {
    return this.jobService.getJobs(id);
  }

  @Put('updatejob/:id')
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
