import { ITicket } from "@app/data/abstraction/entities/ITicket";
import config from "../../../../knexfile";
import { Knex, knex } from "knex";

export interface ITicketRepo {
  getAll(): Promise<ITicket[]>;
  findTicketById(id: string): Promise<ITicket>;
  post(user: ITicket): Promise<void>;
  put(id: string, user: Partial<ITicket>): Promise<void>;
  delete(id: string): Promise<void>;
}

export class TicketRepo implements ITicketRepo {
  callKnex: Knex<ITicket>;
  constructor() {
    this.callKnex = knex(config);
  }
  async getAll(): Promise<ITicket[]> {
    return this.callKnex.select("*").from("tickets");
  }
  async findTicketById(id: string): Promise<ITicket> {
    return this.callKnex("tickets")
      .select()
      .where("ticket_id", id)
      .first();
  }
  async post(user: ITicket): Promise<void> {
    return this.callKnex("tickets").insert([user]);
  }
  async put(id: string, user: Partial<ITicket>): Promise<void> {
    return this.callKnex("tickets").where("ticket_id", id).update(user);
  }
  async delete(id: string): Promise<void> {
    await this.callKnex("tickets").where("ticket_id", id).update({
      isDelete: true,
    });
  }
}
