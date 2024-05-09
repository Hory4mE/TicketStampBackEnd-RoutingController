import { ITicket } from "@app/data/abstraction/entities/ITicket";
import { ITicketRepo } from "@app/data/abstraction/repo/ITicketRepo";
import { Database } from "@app/data/database/Database";
import { TicketStatus } from "@app/modules/Tickets/models/Definitions";
import config from "@knex/knexfile";
import { Knex, knex } from "knex";
import { Container } from "typedi";

export class TicketRepo implements ITicketRepo {
  callKnex = Container.get(Database).callKnex;
  async fetchAllTickets(): Promise<ITicket[]> {
    return this.callKnex.select("*").from("tickets");
  }
  async findTicketById(id: string): Promise<ITicket> {
    return this.callKnex("tickets").where("ticket_id", id).first();
  }
  async createTicket(user: Partial<ITicket>): Promise<void> {
    user.status = TicketStatus.PENDING;
    user.created_date = new Date();
    user.updated_date = new Date();
    user.is_delete = false;
    return this.callKnex("tickets").insert(user);
  }
  async updateStatusById(id: string, user: Partial<ITicket>): Promise<void> {
    const userUpdateTimeStamp: Partial<ITicket> = {
      ...user,
      updated_date: new Date(),
    };
    return this.callKnex("tickets")
      .where("ticket_id", id)
      .update(userUpdateTimeStamp);
  }
  async deleteTicket(id: string): Promise<void> {
    await this.callKnex("tickets").where("ticket_id", id).update({
      is_delete: true,
    });
  }
}
