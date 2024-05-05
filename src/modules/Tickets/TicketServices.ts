import { ITicket } from "@app/data/abstraction/entities/ITicket";
import { TicketRepo } from "../../data/sql/repo/TicketRepo";

export class TicketServices {
  repo;
  constructor() {
    this.repo = new TicketRepo();
  }
  public async getAll(): Promise<ITicket[]> {
    return this.repo.getAll();
  }

  public async findTicket(id: string): Promise<ITicket> {
    return this.repo.findTicketById(id);
  }

  public async createTicket(ticket: any): Promise<void> {
    return await this.repo.post(ticket);
  }
  public async put(id: string, user: any): Promise<void> {
    return await this.repo.put(id, user);
  }
  public async delete(id: string): Promise<void> {
    return await this.repo.delete(id);
  }
}
