import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(
	process.env.DATABASE_URL ||
		"postgresql://neondb_owner:8xNKbLF3JjsT@ep-shy-field-a1a9z5di-pooler.ap-southeast-1.aws.neon.tech/Psyduck?sslmode=require&channel_binding=require",
);

const db = drizzle(sql);

export { sql, db };
