import knex, { Knex } from "knex";
import config from "@knex/knexfile";


export class Database {
  callKnex: Knex;
  constructor(paramsconfig?: Knex.Config) {
    if (paramsconfig) {
      this.callKnex = knex(paramsconfig);
    } else {
      this.callKnex = knex(config);
    }
  }
}
