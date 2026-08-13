-- Preserve the optional metadata captured by the Communities page.
ALTER TABLE "communities"
ADD COLUMN "type" VARCHAR(50),
ADD COLUMN "leader_phone" VARCHAR(20);
