import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    env: {
      JWT_SECRET: "soloparatest",
      DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/libreria_test",
    },
  },
});