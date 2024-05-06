import "reflect-metadata";
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
} from "routing-controllers";

import { TicketServices } from "./TicketServices";
import { Container } from "typedi";
import { ITicket } from "@app/data/abstraction/entities/ITicket";
import _ from "lodash";
import { NotAllow } from "@app/decorator/notAllow";

@Controller()
export class TicketController {
  serviceInstance = Container.get(TicketServices);

  @Get("/")
  async welcomeMessage() {
    try {
      return "Welcome";
    } catch (error) {
      return;
    }
  }

  @Get("/tickets")
  async fetchAllTickets() {
    try {
      const services = await this.serviceInstance.fetchAllTickets();
      return services;
    } catch (error) {
      return error;
    }
  }

  @Get("/tickets/:id")
  async findTicketById(@Param("id") id: string) {
    const services = await this.serviceInstance.findTicketById(id);
    return services;
  }

  @Post("/tickets")
  async createTicket(@Body() user: ITicket) {
    try {
      await this.serviceInstance.createTicket(user);
      return { msg: "successfully crates" };
    } catch (error) {
      return error;
    }
  }

  @Put("/ticket/:id")
  async updateTicket(@Param("id") id: string, @Body() user: Partial<ITicket>) {
    try {
      const pickedTicket = _.pickBy(user, (row) => !!row);
      await this.serviceInstance.updateStatusById(id, pickedTicket);
      return { msg: "successfully update" };
    } catch (error) {
      return error;
    }
  }

  @Delete("/tickets/:id")
  async removeTicket(@Param("id") id: string) {
    await this.serviceInstance.deleteTicket(id);
    return { msg: "successfully delete" };
  }
}
