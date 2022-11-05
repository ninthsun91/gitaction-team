import dotenv from "dotenv";

dotenv.config();

interface Env {
  PORT: number;
  DB_HOST: string;
  SECRET_KEY: string;
}

class Env implements Env {
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;

  constructor() {
    this.PORT = Number(process.env.PORT);

    this.DB_HOST = process.env.DB_HOST!;
    this.DB_NAME = process.env.DB_NAME!;
    this.DB_USER = process.env.DB_USER!;
    this.DB_PASSWORD = process.env.DB_PASSWORD!;

    this.SECRET_KEY = process.env.SECRET_KEY!;
  }
}

export default new Env();
