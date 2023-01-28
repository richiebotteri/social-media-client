import { defineConfig } from "cypress";
import dotenv from "dotenv";
import process from "process";
dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.LOCAL_HOST,
    env: {
      USER_NAME: process.env.USER_NAME,
      USER_EMAIL: process.env.USER_EMAIL,
      USER_PASSWORD: process.env.USER_PASSWORD,
      LOCAL_HOST: process.env.LOCAL_HOST,
    },
  },
});
