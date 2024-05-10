import { ITicket } from "@app/data/abstraction/entities/ITicket";
import { TicketRepo } from "../../data/sql/repo/TicketRepo";
import { Container, Service } from "typedi";
import { HttpError } from "routing-controllers";
import { TicketStatus } from "./models/Definitions";

@Service()
export class TicketServices {
  repo;
  constructor() {
    this.repo = new TicketRepo();
  }
  public async fetchAllTickets(): Promise<ITicket[]> {
    const tickets = await this.repo.fetchAllTickets();
    if (tickets && tickets.length > 0) {
      return tickets;
    } else {
      throw new HttpError(404, "Ticket Not Found");
    }
  }

  public async findTicketById(id: string): Promise<ITicket> {
    const ticket = await this.repo.findTicketById(id);
    if (ticket) {
      return ticket;
    } else {
      throw new HttpError(404, "Ticket Not Found");
    }
  }

  public async createTicket(
    ticket: Pick<ITicket, "title" | "description">
  ): Promise<void> {
    const creation = await this.repo.createTicket(ticket);
    return creation;
  }

  public async updateStatusById(
    id: string,
    user: Partial<ITicket>
  ): Promise<void> {
    const ticket = await this.repo.findTicketById(id);
    if (!ticket) {
      throw new HttpError(404, "Ticket not Found");
    }

    if (
      ticket.status === TicketStatus.PENDING &&
      (user.status === TicketStatus.IN_PROGRESS ||
        user.status === TicketStatus.CANCELLED)
    ) {
      await this.repo.updateStatusById(id, user);
    } else if (
      ticket.status === TicketStatus.IN_PROGRESS &&
      user.status === TicketStatus.PENDING
    ) {
      throw new HttpError(
        400,
        "Ticket status cannot be changed from 'In Progress' to 'Pending'"
      );
    } else if (ticket.status === TicketStatus.COMPLETED || ticket.status === TicketStatus.CANCELLED) {
      throw new HttpError(400,"Ticket status is 'Completed' or 'Cancelled'. It cannot be changed.");
    }
  }

  public async deleteTicket(id: string): Promise<void> {
    return await this.repo.deleteTicket(id);
  }
}
