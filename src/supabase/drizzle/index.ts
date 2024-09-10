import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import Schema from "./schemas";

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, {
    ssl: { rejectUnauthorized: false },
    prepare: false,
});

const db = drizzle(client, { schema: Schema.$raw });

export default db;
