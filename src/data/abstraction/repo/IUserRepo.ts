import { IUser } from "../entities/IUser";

export interface IUserRepo {
  getAll(): Promise<IUser>;
  getOne(): Promise<IUser>;
  post(): Promise<void>;
  put(id: number, user: Partial<IUser>): Promise<void>;
  delete(id: number): Promise<void>;
}
