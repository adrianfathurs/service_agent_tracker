-- CreateTable
CREATE TABLE "agents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Developer',
    "current_task" TEXT,
    "status" TEXT NOT NULL DEFAULT 'IDLE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agent_telemetries" (
    "id" SERIAL NOT NULL,
    "agent_id" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "prompt_count" INTEGER NOT NULL DEFAULT 1,
    "duration_ms" BIGINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agent_telemetries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agent_mandays_summary" (
    "id" SERIAL NOT NULL,
    "agent_id" TEXT NOT NULL,
    "total_prompts" INTEGER NOT NULL DEFAULT 0,
    "total_duration_ms" BIGINT NOT NULL DEFAULT 0,
    "calculated_mandays" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "last_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agent_mandays_summary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agent_mandays_summary_agent_id_key" ON "agent_mandays_summary"("agent_id");

-- AddForeignKey
ALTER TABLE "agent_telemetries" ADD CONSTRAINT "agent_telemetries_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent_mandays_summary" ADD CONSTRAINT "agent_mandays_summary_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
