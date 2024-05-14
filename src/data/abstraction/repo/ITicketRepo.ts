import { ITicket } from "../entities/ITicket";

export interface ITicketRepo {
  fetchAllTickets(): Promise<ITicket[]>;
  findTicketById(id: string): Promise<ITicket>;
  createTicket(user: ITicket): Promise<void>;
  updateTicketById(id: string, user: Partial<ITicket>): Promise<void>;
  updateStatusById(id: string, user: Partial<ITicket>): Promise<void>;
  deleteTicket(id: string): Promise<void>;
}
