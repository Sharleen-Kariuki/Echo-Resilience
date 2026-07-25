-- CreateTable
CREATE TABLE "community_members" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(255),
    "phone_number" VARCHAR(32) NOT NULL,
    "region_id" INTEGER NOT NULL,
    "community_id" INTEGER,
    "language" VARCHAR(50),
    "dialect" VARCHAR(100),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "consent" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "community_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "call_attempts" (
    "id" SERIAL NOT NULL,
    "alert_history_id" INTEGER NOT NULL,
    "member_id" INTEGER,
    "phone_number" VARCHAR(32) NOT NULL,
    "channel" VARCHAR(20) NOT NULL DEFAULT 'voice',
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "provider" VARCHAR(50),
    "provider_call_id" VARCHAR(100),
    "language" VARCHAR(50),
    "dialect" VARCHAR(100),
    "attempt_count" INTEGER NOT NULL DEFAULT 0,
    "last_attempt_at" TIMESTAMPTZ,
    "completed_at" TIMESTAMPTZ,
    "failure_reason" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "call_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ivr_config" (
    "id" SERIAL NOT NULL,
    "provider" VARCHAR(50) NOT NULL DEFAULT 'africastalking',
    "voice_phone_number" VARCHAR(32),
    "default_language" VARCHAR(50),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ivr_config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_community_members_region" ON "community_members"("region_id");

-- CreateIndex
CREATE INDEX "idx_community_members_community" ON "community_members"("community_id");

-- CreateIndex
CREATE INDEX "idx_community_members_phone" ON "community_members"("phone_number");

-- CreateIndex
CREATE INDEX "idx_call_attempts_alert_history" ON "call_attempts"("alert_history_id");

-- CreateIndex
CREATE INDEX "idx_call_attempts_member" ON "call_attempts"("member_id");

-- CreateIndex
CREATE INDEX "idx_call_attempts_status" ON "call_attempts"("status");

-- AddForeignKey
ALTER TABLE "community_members" ADD CONSTRAINT "community_members_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_members" ADD CONSTRAINT "community_members_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "call_attempts" ADD CONSTRAINT "call_attempts_alert_history_id_fkey" FOREIGN KEY ("alert_history_id") REFERENCES "alert_history"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "call_attempts" ADD CONSTRAINT "call_attempts_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "community_members"("id") ON DELETE SET NULL ON UPDATE CASCADE;
