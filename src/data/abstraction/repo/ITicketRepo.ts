import { ITicket } from "../entities/ITicket";

export interface ITicketRepo {
  getAll(): Promise<ITicket>;
  findTicket(): Promise<ITicket>;
  post(): Promise<void>;
  put(id: number, user: Partial<ITicket>): Promise<void>;
  delete(id: number): Promise<void>;
}
