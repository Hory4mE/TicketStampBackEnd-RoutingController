import { IUser } from "@app/data/abstraction/entities/IUser";
import { UserRepo } from "../../data/sql/repo/UserRepo";
import { error } from "console";


export class UserServices {
  public async getAll(): Promise<IUser[]> {
    const user: IUser = {
      user_id: 0,
      user_name: "",
      tel: 0,
      sex: "",
      isDelete: false,
    };
    // throw new Error("in mantinance")
    const repo = new UserRepo();
    return repo.getAll();
  }
  public async getOne(id: number): Promise<IUser[]> {
    const user: IUser = {
      user_id: 0,
      user_name: "",
      tel: 0,
      sex: "",
      isDelete: false,
    };
    const repo = new UserRepo();
    return repo.getAll();
  }
  public async post(user: any): Promise<void> {
    const repo = new UserRepo();
    repo.post(user);
  }
  public async put(id: number, user: any): Promise<void> {
    const repo = new UserRepo();
    repo.put(id, user);
  }
  public async delete(id: number): Promise<void> {
    const repo = new UserRepo();
    repo.delete(id);
  }
}
