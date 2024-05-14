import { ITicket } from "@app/data/abstraction/entities/ITicket";
import { ForbiddenError, NotFoundError } from "@app/data/abstraction/errors/";
import { Service } from "typedi";
import { TicketRepo } from "../../data/sql/repo/TicketRepo";
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
      throw new NotFoundError("Ticket Not Found")
    }
  }

  public async findTicketById(id: string): Promise<ITicket> {
    const ticket = await this.repo.findTicketById(id);
    if (ticket) {
      return ticket;
    } else {
      throw new NotFoundError("Ticket Not Found");
    }
  }

  public async createTicket(
    ticket: Pick<ITicket, "title" | "description">
  ): Promise<void> {
    await this.repo.createTicket(ticket);
  }

  public async updateTicketById(
    id: string,
    user: Partial<ITicket>
  ): Promise<void> {
    const ticket = await this.repo.findTicketById(id);
    if (!ticket) {
      throw new NotFoundError("Ticket Not Found");
    }
    await this.repo.updateTicketById(id, user);
  }

  public async updateStatusById(
    id: string,
    user: Partial<ITicket>
  ): Promise<void> {
    const ticket = await this.repo.findTicketById(id);
    if (!ticket) {
      throw new NotFoundError("Ticket Not Found");
    }

    if (user.status) { // Check if user provides a status
      if (
        ticket.status === TicketStatus.PENDING &&
        (user.status === TicketStatus.IN_PROGRESS ||
          user.status === TicketStatus.CANCELLED)
      ) {
        await this.repo.updateStatusById(id, user);
      } else if (
        ticket.status === TicketStatus.IN_PROGRESS &&
        user.status === TicketStatus.COMPLETED
      ) {
        await this.repo.updateStatusById(id, user);
      } else {
        throw new ForbiddenError("Invalid status transition or ticket status cannot be changed")
      }
    } else {
      throw new NotFoundError("No Status provided for updates...");
    }
  }


  public async deleteTicket(id: string): Promise<void> {
    const ticket = await this.repo.findTicketById(id);
    if (!ticket) {
      throw new NotFoundError("Ticket Not Found");
    }
    if (ticket.status === TicketStatus.COMPLETED ||
      ticket.status === TicketStatus.CANCELLED) {
      throw new ForbiddenError("Cannot Delete Completed or Cancelled Ticket")
    } else {
      return await this.repo.deleteTicket(id);
    }
  }
}
