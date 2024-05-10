import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("tickets", function (table) {
    table.renameColumn("isDelete", "is_delete");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("tickets", function (table) {
    table.renameColumn("is_delete", "isDelete");
  });
}