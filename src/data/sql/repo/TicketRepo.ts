import { ITicket } from "@app/data/abstraction/entities/ITicket";
import config from "../../../../knexfile";
import { Knex, knex } from "knex";

export interface ITicketRepo {
  getAll(): Promise<ITicket[]>;
  findTicketById(id: string): Promise<ITicket>;
  post(user: ITicket): Promise<void>;
  put(id: number, user: Partial<ITicket>): Promise<void>;
  delete(id: number): Promise<void>;
}

export class TicketRepo implements ITicketRepo {
  callKnex: Knex<ITicket>;
  constructor() {
    this.callKnex = knex(config);
  }
  async getAll(): Promise<ITicket[]> {
    return this.callKnex.select("*");
  }
  async findTicketById(id: string): Promise<ITicket> {
    return this.callKnex.first();
  }
  async post(user: ITicket): Promise<void> {
    return this.callKnex.insert([user]);
  }
  async put(id: number, user: Partial<ITicket>): Promise<void> {
    return this.callKnex.update([user]);
  }
  async delete(id: number): Promise<void> {
    this.callKnex.update({
      isDelete: true,
    });
  }
}
