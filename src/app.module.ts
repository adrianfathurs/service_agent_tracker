import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { TelemetryController } from './telemetry/telemetry.controller';
import { TelemetryService } from './telemetry/telemetry.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [TelemetryController],
  providers: [PrismaService, TelemetryService],
})
export class AppModule {}