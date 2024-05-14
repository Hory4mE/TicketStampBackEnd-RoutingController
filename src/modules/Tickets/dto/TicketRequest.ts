/* eslint-disable prettier/prettier */
import { TicketStatus } from "../models/Definitions";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { NotAllow } from "@app/decorator/NotAllow";

export class CreateTicketStatusRequest {
  @Expose({ name: "title" })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @Expose({ name: "description" })
  @IsOptional()
  @IsString()
  readonly description: string;
}
export class UpdateTicketStatusRequest {
  @Expose({ name: "status" })
  @IsOptional()
  @IsEnum(TicketStatus)
  readonly status: TicketStatus;
}

export class bodyUpdateRequest {
  @NotAllow()
  readonly status: TicketStatus;

  @Expose({ name: "title" })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @Expose({ name: "description" })
  @IsOptional()
  @IsString()
  readonly description: string;
}
