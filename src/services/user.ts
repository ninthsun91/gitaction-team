import User from "../db/repositories/user";
import { UserI } from "../interfaces/interface";

export default {
  signup: async (user: UserI) => {
    console.log(user)
    const existName = await User.findByName(user.name);
    if (existName) throw new Error("닉네임중복");

    await User.signup(user);
  },
};
