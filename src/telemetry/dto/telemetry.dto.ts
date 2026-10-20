import { IsString, IsNumber, IsOptional } from 'class-validator';

export class IngestTelemetryDto {
  @IsString()
  agentId: string;

  @IsString()
  projectName: string;

  @IsString()
  @IsOptional()
  eventType?: string;

  @IsNumber()
  @IsOptional()
  promptCount?: number;

  @IsNumber()
  @IsOptional()
  durationMs?: number;
}