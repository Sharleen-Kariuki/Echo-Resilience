-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('superadmin', 'admin', 'viewer');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'viewer',
    "last_login" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hazard_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "hazard_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "total_registered" INTEGER NOT NULL DEFAULT 0,
    "region_id" INTEGER NOT NULL,
    "registration_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" VARCHAR(100),
    "status" VARCHAR(50) DEFAULT 'active',
    "actions" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "communities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerts" (
    "id" SERIAL NOT NULL,
    "hazard_type_id" INTEGER NOT NULL,
    "severity_level" VARCHAR(50) NOT NULL,
    "raw_scientific_description" TEXT NOT NULL,
    "created_by_user_id" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alert_regions" (
    "alert_id" INTEGER NOT NULL,
    "region_id" INTEGER NOT NULL,

    CONSTRAINT "alert_regions_pkey" PRIMARY KEY ("alert_id","region_id")
);

-- CreateTable
CREATE TABLE "alert_history" (
    "id" SERIAL NOT NULL,
    "alert_id" INTEGER NOT NULL,
    "region_id" INTEGER NOT NULL,
    "dialect" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "calls_count" INTEGER NOT NULL DEFAULT 0,
    "dispatched_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "simplified_text" TEXT,
    "translated_text" TEXT,
    "audio_url" TEXT,

    CONSTRAINT "alert_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_logs" (
    "id" SERIAL NOT NULL,
    "alert_history_id" INTEGER NOT NULL,
    "region_id" INTEGER NOT NULL,
    "hazard_type_id" INTEGER NOT NULL,
    "audio_feedback_url" TEXT,
    "translation_text" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "regions_name_key" ON "regions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "hazard_types_name_key" ON "hazard_types"("name");

-- CreateIndex
CREATE INDEX "idx_communities_region" ON "communities"("region_id");

-- CreateIndex
CREATE INDEX "idx_alerts_hazard" ON "alerts"("hazard_type_id");

-- CreateIndex
CREATE INDEX "idx_alert_history_alert" ON "alert_history"("alert_id");

-- CreateIndex
CREATE INDEX "idx_feedback_logs_history" ON "feedback_logs"("alert_history_id");

-- AddForeignKey
ALTER TABLE "communities" ADD CONSTRAINT "communities_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_hazard_type_id_fkey" FOREIGN KEY ("hazard_type_id") REFERENCES "hazard_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_regions" ADD CONSTRAINT "alert_regions_alert_id_fkey" FOREIGN KEY ("alert_id") REFERENCES "alerts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_regions" ADD CONSTRAINT "alert_regions_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_history" ADD CONSTRAINT "alert_history_alert_id_fkey" FOREIGN KEY ("alert_id") REFERENCES "alerts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_history" ADD CONSTRAINT "alert_history_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_logs" ADD CONSTRAINT "feedback_logs_alert_history_id_fkey" FOREIGN KEY ("alert_history_id") REFERENCES "alert_history"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_logs" ADD CONSTRAINT "feedback_logs_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_logs" ADD CONSTRAINT "feedback_logs_hazard_type_id_fkey" FOREIGN KEY ("hazard_type_id") REFERENCES "hazard_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
