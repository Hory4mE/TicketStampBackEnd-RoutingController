/* eslint-disable prettier/prettier */
import { TicketStatus } from "../models/Definitions";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { NotAllow } from "@app/decorator/NotAllow";

export class CreateTicketStatusRequest {
  @Expose({ name: "title" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Expose({ name: "description" })
  @IsOptional()
  @IsString()
  description: string;
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
