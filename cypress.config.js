import eslint from "eslint";
import process from "process";
import { defineConfig } from "cypress";
import dotenv from "dotenv";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      dotenv.config();
      config.env = { ...config.env, ...process.env };
      on("file:preprocessor", eslint());
    },
  },
});
