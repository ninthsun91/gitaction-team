import Users from "../models/user";

interface UserI {
  userId: number;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

class UsersRepository extends Users {
  constructor() {
    super();
  }
}

export default new UsersRepository();
