import "reflect-metadata";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from "routing-controllers";

import { ApplicationError, BadRequestError, CustomHttpError, InternalServerError, NotFoundError } from "@app/data/abstraction/errors";
import _ from "lodash";
import { Container } from "typedi";
import { TicketServices } from "./TicketServices";
import { CreateTicketStatusRequest, UpdateTicketStatusRequest, bodyUpdateRequest } from "./dto/TicketRequest";

@Controller()
export class TicketController {
  serviceInstance = Container.get(TicketServices);

  @Get("/")
  async welcomeMessage() {
    return "Welcome";
  }

  @Get("/tickets")
  async fetchAllTickets() {
    try {
      const services = await this.serviceInstance.fetchAllTickets();
      return services;
    } catch (error) {
      if (error instanceof ApplicationError) throw error;
      else if (error instanceof CustomHttpError) throw error;
      else {
        throw new InternalServerError;
      }
    }
  }

  @Get("/tickets/:id")
  async findTicketById(@Param("id") id: string) {
    try {
      const services = await this.serviceInstance.findTicketById(id);
      return services;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof CustomHttpError) {
        throw error;
      } else {
        throw new InternalServerError;
      }
    }
  }

  @Post("/tickets")
  async createTicket(@Body() user: CreateTicketStatusRequest) {
    try {
      await this.serviceInstance.createTicket(user);
      return { msg: "successfully crates" };
    } catch (error) {
      if (error instanceof ApplicationError) throw error;
      if (error instanceof CustomHttpError) {
        throw error;
      } else {
        throw new InternalServerError;
      }
    }
  }

  @Put("/tickets/status/:id")
  async updateTicketStatus(@Param("id") id: string, @Body() user: UpdateTicketStatusRequest) {
    try {
      const pickedTicket = _.pickBy(user, (row) => !!row);
      await this.serviceInstance.updateStatusById(id, pickedTicket);
      return { msg: "successfully update Status" };
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      }
      else if (error instanceof CustomHttpError) {
        throw error;
      } else {
        throw new InternalServerError;
      }
    }
  }

  @Put("/tickets/:id")
  async updateTicketData(@Param("id") id: string, @Body() user: bodyUpdateRequest) {
    try {
      const pickedTicket = _.pickBy(user, (row) => !!row);
      await this.serviceInstance.updateTicketById(id, pickedTicket);
      return { msg: "successfully update Data" };
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      }
      else if (error instanceof CustomHttpError) {
        throw error;
      } else {
        throw new InternalServerError;
      }
    }
  }

  @Delete("/tickets/:id")
  async removeTicket(@Param("id") id: string) {
    try {
      await this.serviceInstance.deleteTicket(id);
      return { msg: "successfully delete" };
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      } else if (error instanceof CustomHttpError) {
        throw error;
      } else {
        throw new InternalServerError;
      }
    }
  }
}
