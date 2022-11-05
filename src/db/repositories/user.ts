import Users from "../models/user";
import { UserI } from "../../interfaces/interface";

class UsersRepository extends Users {
  constructor() {
    super();
  }

  signup = async (user: UserI) => {
    await Users.create(user);
  };

  findByName = async (name: string) => {
    return await Users.findOne({
      where: { name },
    });
  };

  findByUser = async (userId: number) => {
    return await Users.findByPk(userId);
  };
}

export default new UsersRepository();
