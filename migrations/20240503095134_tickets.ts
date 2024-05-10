import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists("tickets", (table) => {
        table.increments("ticket_id").primary();
        table.string("title").notNullable();
        table.text("description");
        table.string("status").notNullable();
        table.timestamp("created_date").notNullable();
        table.timestamp("updated_date").notNullable();
        table.boolean("isDelete").notNullable().defaultTo(false);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("tickets");
}

