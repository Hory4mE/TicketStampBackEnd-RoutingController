import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { id: 1, colName: "rowValue1" },
        { id: 2, colName: "rowValue2" },
        { id: 3, colName: "rowValue3" },
        { id: 4, colName: "rowValue3" },
        { id: 5, colName: "rowValue3" },
        { id: 6, colName: "rowValue3" },
        { id: 7, colName: "rowValue3" },
        
    ]);
};
