import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env" });
config({ path: ".env.local" });

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/supabase/drizzle/schemas/*.ts",
    out: "./.drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
    schemaFilter: ["public"],
});
