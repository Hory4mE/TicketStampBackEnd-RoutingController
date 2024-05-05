import "reflect-metadata";
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from "routing-controllers";

import { TicketServices } from "./TicketServices";

@Controller()
export class TicketController {
  @Get("/")
  response() {
    return { msg: "Welcome" };
  }
  @Get("/tickets")
  getAll() {
    const services = new TicketServices();
    return services.getAll();
  }

  @Get("/ticket/:id")
  getOne(@Param("id") id: string) {
    const services = new TicketServices();
    return services.findTicket(id);
  }

  @Post("/ticket")
  async post(@Body() user: any) {
    const services = new TicketServices();
    await services.createTicket(user);
    return { msg: "successfully crates" };
  }

  @Put("/ticket/:id")
  async put(@Param("id") id: string, @Body() user: any) {
    const services = new TicketServices();
    await services.put(id, user);
    return {msg : "successfully update"}
  }

  @Delete("/ticket/:id")
  async remove(@Param("id") id: string) {
    const services = new TicketServices();
    await services.delete(id);
    return { msg : "successfully delete"}
  }
}
