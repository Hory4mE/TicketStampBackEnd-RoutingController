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

import { UserServices } from "./UserServices";

@Controller()
export class UserController {
  @Get("/users")
  getAll() {
    const services = new UserServices();
    return services.getAll();
  }

  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    const services = new UserServices();
    return services.getOne(id);
  }

  @Post("/users")
  async post(@Body() user: any) {
    const services = new UserServices();
    await services.post(user);
    return { msg: "successfully crates" };
  }

  @Put("/users/:id")
  async put(@Param("id") id: number, @Body() user: any) {
    const services = new UserServices();
    await services.put(id, user);
    return {msg : "successfully update"}
  }

  @Delete("/users/:id")
  async remove(@Param("id") id: number) {
    const services = new UserServices();
    await services.delete(id);
    return { msg : "successfully delete"}
  }
}
