import dotenv from "dotenv";

dotenv.config();

interface IEnvConfig {
  PORT: string;
  NODE_ENV: string;
  DATABASE_URL: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
}

const envConfigs = (): IEnvConfig => {
  const requiredEnvVars = [
    "PORT",
    "NODE_ENV",
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
  ];
  if (process.env.NODE_ENV === "development") {
    requiredEnvVars.forEach((envVar) => {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    });
  }

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
  };
};

export const envVars = envConfigs();
