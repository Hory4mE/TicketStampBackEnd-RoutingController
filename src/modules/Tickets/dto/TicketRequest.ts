/* eslint-disable prettier/prettier */
import { TicketStatus } from "../models/Definitions";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { ITicket } from "@app/data/abstraction/entities/ITicket";
import { NotAllow } from "@app/decorator/notAllow";

export class CreateTicketStatusRequest implements ITicket {
  @Expose({ name: "ticket_id" })
  @IsNotEmpty()
  @IsString()
  ticket_id: string;

  @Expose({ name: "description" })
  @IsOptional()
  @IsString()
  description: string;

  @Expose({ name: "status" })
  @IsNotEmpty()
  @IsEnum(TicketStatus)
  status: TicketStatus;

  @Expose({ name: "created_date" })
  @IsNotEmpty()
  created_date: Date;

  @Expose({ name: "updated_date" })
  @IsNotEmpty()
  updated_date: Date;

  @Expose({ name: "isDelete" })
  @IsNotEmpty()
  isDelete: boolean;

  @Expose({ name: "title" })
  @IsNotEmpty()
  @IsString()
  title: string;
}
export class UpdateTicketStatusRequest {
  @Expose({ name: "status" })
  @IsOptional()
  @IsEnum(TicketStatus)
  status: TicketStatus;
}

export class bodyUpdateRequest {
  @NotAllow()
  status: TicketStatus;
  
  @Expose({ name: "title" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Expose({ name: "description" })
  @IsOptional()
  @IsString()
  description: string;
}
