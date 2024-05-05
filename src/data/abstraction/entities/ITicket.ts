import { TicketStatus } from "@app/modules/Tickets/models/Definitions";

export interface ITicket {
  ticket_id: string;
  title: string;
  description: string;
  status: TicketStatus;
  created_date: Date;
  updated_date: Date;
  isDelete: boolean;
}