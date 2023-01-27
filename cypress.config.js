import { defineConfig } from "cypress";
import dotenv from "dotenv";
import process from "process";
dotenv.config();

export default defineConfig({
  e2e: {
    env: {
      API_USERNAME: process.env.API_USERNAME,
      API_EMAIL: process.env.API_EMAIL,
      API_PASSWORD: process.env.API_PASSWORD,
      API_TOKEN: process.env.API_TOKEN,
    },
  },
});
