import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddJobDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;
  @IsString()
  @IsNotEmpty()
  status: string;

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
  status?: string;
  @IsString()
  @IsOptional()
  location?: string;
  @IsString()
  @IsOptional()
  description?: string;
}
