CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "language" VARCHAR(100) NOT NULL,
    "locality" VARCHAR(150),
    "source" VARCHAR(100),
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "region_id" INTEGER NOT NULL,
    "community_id" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "members_phone_key" ON "members"("phone");
CREATE INDEX "idx_members_region" ON "members"("region_id");
CREATE INDEX "idx_members_community" ON "members"("community_id");

ALTER TABLE "members" ADD CONSTRAINT "members_region_id_fkey"
FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "members" ADD CONSTRAINT "members_community_id_fkey"
FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
