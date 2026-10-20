# Instructions: End-to-End Agent Tracker Ecosystem (NPM Package & NestJS Backend)

Dokumen ini berisi spesifikasi teknis dan instruksi deklaratif yang dirancang untuk dieksekusi secara otomatis oleh AI Agent. Sistem ini terdiri dari **Backend Ingest Service (NestJS + Prisma ORM + PostgreSQL)** dan **Client SDK/CLI NPM Package (`@company/agent-tracker`)** agar seluruh aktivitas prompting/koding AI tim developer otomatis tercatat dan dikalkulasi menjadi **Mandays**.

---

## 🏗️ Arsitektur Ecosystem

```text
 💻 Developer Laptop                        🏢 Server Internal Perusahaan
┌─────────────────────────┐               ┌──────────────────────────────┐
│  npm install -g         │               │  NestJS Backend Ingest API   │
│  @company/agent-tracker │               │  (Port 3000)                 │
└────────────┬────────────┘               └──────────────┬───────────────┘
             │                                           │
             ▼                                           ▼
┌─────────────────────────┐               ┌──────────────────────────────┐
│ Exec: agent-tracker     │─── HTTP POST ─│ PostgreSQL Database          │
│ - Wrap Claude/GLM CLI   │  /telemetry   │ - Table: agents              │
│ - Prompt Count & Time   │  (Bearer Auth)│ - Table: agent_telemetries   │
│ - Local Offline Queue   │               │ - Table: agent_mandays_summary│
└─────────────────────────┘               └──────────────────────────────┘