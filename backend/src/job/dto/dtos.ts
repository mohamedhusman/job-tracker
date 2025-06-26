import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddJobDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;
  @IsString()
  @IsNotEmpty()
  status: string;
  @IsString()
  @IsNotEmpty()
  jobTitle: string;
  @IsOptional()
  @IsString()
  location?: string;
  @IsOptional()
  @IsString()
  description?: string;
  author: string;
}

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  companyName: string;
  @IsString()
  @IsOptional()
  status?: string;
  @IsString()
  @IsOptional()
  jobTitle?: string;
  @IsString()
  @IsOptional()
  location?: string;
  @IsString()
  @IsOptional()
  description?: string;
}
