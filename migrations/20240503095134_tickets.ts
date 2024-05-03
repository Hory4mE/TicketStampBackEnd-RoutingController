import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists("tickets", (table) => {
        table.increments("ticket_id").primary();
        table.string("title").notNullable();
        table.integer("description").notNullable();
        table.string("created_date").notNullable();
        table.string("updated_date").notNullable();
        table.boolean("isDelete").notNullable();
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("tickets");
}

