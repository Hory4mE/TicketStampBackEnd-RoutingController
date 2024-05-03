import { IUser } from "@app/data/abstraction/entities/IUser";
import config from "../../../../knexfile";
import { Knex, knex } from "knex";

export interface IUserRepo {
  getAll(): Promise<IUser[]>;
  getOne(id: number): Promise<IUser>;
  post(user: IUser): Promise<void>;
  put(id: number, user: Partial<IUser>): Promise<void>;
  delete(id: number): Promise<void>;
}

export class UserRepo implements IUserRepo {
  callKnex: Knex<IUser>;
  constructor() {
    this.callKnex = knex(config);
  }
  async getAll(): Promise<IUser[]> {
    return this.callKnex.select("*");
  }
  async getOne(id: number): Promise<IUser> {
    return this.callKnex.first();
  }
  async post(user: IUser): Promise<void> {
    return this.callKnex.insert([user]);
  }
  async put(id: number, user: Partial<IUser>): Promise<void> {
    return this.callKnex.update([user]);
  }
  async delete(id: number): Promise<void> {
    this.callKnex.update({
      isDelete: true,
    });
  }
}
