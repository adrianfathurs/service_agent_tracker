import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { IngestTelemetryDto } from './dto/telemetry.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('agents')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post('telemetry')
  @UseGuards(AuthGuard)
  async ingestTelemetry(@Body() dto: IngestTelemetryDto) {
    return this.telemetryService.processTelemetry(dto);
  }
}