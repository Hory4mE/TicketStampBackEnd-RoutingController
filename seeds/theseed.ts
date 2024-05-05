import { Knex } from "knex";
import { TicketStatus } from "../src/modules/Tickets/models/Definitions";
import { ITicket } from "@app/data/abstraction/entities/ITicket";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tickets").del();

    // Generate randomized data
    const titles = ["Title 1", "Title 2", "Title 3"];
    const descriptions = ["Description 1", "Description 2", "Description 3"];
    const createdDates = [new Date(), new Date(), new Date()]; // Or generate random dates
    const updatedDates = [new Date(), new Date(), new Date()]; // Or generate random dates
    const status = [
        TicketStatus.PENDING,
        TicketStatus.IN_PROGRESS,
        TicketStatus.APPROVE
    ];

    const data: Partial<ITicket>[] = titles.map((title, index) => ({
        title,
        description: descriptions[index],
        status: status[index], // Using the TicketStatus enum here
        created_date: createdDates[index],
        updated_date: updatedDates[index],
    }));

    // Inserts seed entries
    await knex("tickets").insert(data);
}
