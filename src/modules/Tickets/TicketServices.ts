import { ITicket } from "@app/data/abstraction/entities/ITicket";
import { TicketRepo } from "@app/data/sql/repo/TicketRepo";

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
    return this.repo.post(ticket);
  }
  public async put(id: number, user: any): Promise<void> {
    this.repo.put(id, user);
  }
  public async delete(id: number): Promise<void> {
    this.repo.delete(id);
  }
}
