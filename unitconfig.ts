import { Knex } from "knex";

export const unitconfig:Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: ":memory:",
  },
  migrations: { directory: "./migrations" },
};
