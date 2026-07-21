-- AlterTable
ALTER TABLE "feedback_logs" ADD COLUMN     "admin_response" TEXT,
ADD COLUMN     "responded_at" TIMESTAMPTZ,
ADD COLUMN     "status" VARCHAR(50) NOT NULL DEFAULT 'pending';
