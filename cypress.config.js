import { defineConfig } from "cypress";
import dotenv from "dotenv";
import process from "process";
dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5500",
    env: {
      USER_NAME: process.env.USER_NAME,
      USER_EMAIL: process.env.USER_EMAIL,
      USER_PASSWORD: process.env.USER_PASSWORD,
      LOCAL_HOST: process.env.LOCAL_HOST,
    },
  },
});
