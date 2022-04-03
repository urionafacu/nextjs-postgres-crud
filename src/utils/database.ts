import { Pool } from "pg";

let conn: Pool | undefined;

if (!conn) {
  conn = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "tasks",
  });
}

export { conn };
