import User from "../db/repositories/user";
import { UserI } from "../interfaces/interface";

export default {
  signup: async (user: UserI) => {
    const existName = await User.findByName(user.name);
    if (existName) throw new Error("닉네임중복");

    await User.signup(user);
  },

  login: async (loginInfo: UserI) => {
    const userInfo = await User.findByName(loginInfo.name);

    if (!userInfo) throw new Error("유저정보없음");

    if (userInfo?.password !== loginInfo.password)
      throw new Error("패스워드 불일치");

    return userInfo;
  },

  userInfo: async (userId: number) => {
    const userInfo = await User.findByUser(userId);

    if (!userInfo) throw new Error("없는유저");

    return userInfo;
  },
};
