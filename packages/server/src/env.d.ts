declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    CORS_ORIGIN: string;
    SESSION_SECRET: string;
    SENDGRID_APIKEY: string;
    EXPO_ACCESS_TOKEN: string;
  }
}