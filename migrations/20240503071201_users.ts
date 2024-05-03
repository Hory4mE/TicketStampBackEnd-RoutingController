import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists("users", (table) => {
        table.increments("user_id").primary();
        table.string("user_name").notNullable();
        table.integer("tel").notNullable();
        table.string("sex").notNullable();
        table.boolean("isDelete").notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

