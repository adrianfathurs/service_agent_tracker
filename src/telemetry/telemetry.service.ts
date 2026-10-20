import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IngestTelemetryDto } from './dto/telemetry.dto';

@Injectable()
export class TelemetryService {
  // Patokan: 20 prompt setara 1 Man-Day (8 jam kerja)
  private readonly PROMPTS_PER_MANDAY = 20;

  constructor(private prisma: PrismaService) {}

  async processTelemetry(dto: IngestTelemetryDto) {
    const prompts = dto.promptCount || 1;
    const duration = dto.durationMs || 0;

    return await this.prisma.$transaction(async (tx) => {
      // 1. Upsert Data Agent
      await tx.agent.upsert({
        where: { id: dto.agentId },
        update: { status: 'BUSY', updatedAt: new Date() },
        create: {
          id: dto.agentId,
          name: dto.agentId.split('@')[0] || 'Unknown Agent',
          role: 'Developer',
          status: 'BUSY',
        },
      });

      // 2. Simpan Telemetry Event
      await tx.agentTelemetry.create({
        data: {
          agentId: dto.agentId,
          projectName: dto.projectName,
          eventType: dto.eventType || 'PROMPT_EXECUTION',
          promptCount: prompts,
          durationMs: BigInt(duration),
        },
      });

      // 3. Update & Hitung Ulang Mandays Summary
      const summary = await tx.agentMandaysSummary.upsert({
        where: { agentId: dto.agentId },
        update: {
          totalPrompts: { increment: prompts },
          totalDurationMs: { increment: BigInt(duration) },
        },
        create: {
          agentId: dto.agentId,
          totalPrompts: prompts,
          totalDurationMs: BigInt(duration),
          calculatedMandays: Number((prompts / this.PROMPTS_PER_MANDAY).toFixed(2)),
        },
      });

      const updatedMandays = Number((summary.totalPrompts / this.PROMPTS_PER_MANDAY).toFixed(2));

      const finalSummary = await tx.agentMandaysSummary.update({
        where: { agentId: dto.agentId },
        data: { calculatedMandays: updatedMandays },
      });

      return {
        success: true,
        agentId: dto.agentId,
        totalPrompts: finalSummary.totalPrompts,
        calculatedMandays: finalSummary.calculatedMandays,
      };
    });
  }
}