// Imported by relative path, not the bare "@prisma/client" specifier — the
// shared schema (database/prisma/schema.prisma) generates into a single
// explicit location (database/generated/client) that every consuming
// package points at directly, since there are no npm workspaces tying this
// repo's node_modules together. See the `output` comment in schema.prisma.
import { PrismaClient } from "../../../database/generated/client/index.js";

export const prisma = new PrismaClient();
