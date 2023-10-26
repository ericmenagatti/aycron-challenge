declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      NEXTAUTH_SECRET: string;
      MONGODB_URI: string;
    }
  }
}

export { }