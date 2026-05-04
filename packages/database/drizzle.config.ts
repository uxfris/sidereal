import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "postgresql", // or "mysql" / "sqlite"
  schema: "./drizzle/schema.ts", // Where Drizzle will generate your schema
  out: "./drizzle", // Folder for metadata/migrations
  dbCredentials: {
    url: "postgresql://lume:lume@localhost:5432/lume",
  },
})
