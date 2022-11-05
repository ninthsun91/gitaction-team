import { Request, Response, NextFunction } from "express";
import User from "../../services/user";
import { UserI } from "../../interfaces/interface";
import jwt from "jsonwebtoken";
import env from "../../config.env";

export default {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, password, confirm } = req.body;

      if (!name) throw new Error("닉네임빈값");
      if (!password || !confirm) throw new Error("비밀번호빈값");
      if (password !== confirm) throw new Error("비밀번호 불일치");

      const userInfo: UserI = { name, password };
      await User.signup(userInfo);

      res.status(200).send({ message: "회원가입 성공" });
    } catch (err) {
      console.log(err);
      console.trace(err);
      res.status(400).send({ errorMessage: "회원가입 실패" });
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, password } = req.body;

      if (!name) throw new Error("닉네임빈값");
      if (!password) throw new Error("비밀번호빈값");

      const loginInfo: UserI = { name, password };

      const userInfo = await User.login(loginInfo);

      const accessToken = jwt.sign(
        { userId: userInfo.userId },
        env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign({}, env.SECRET_KEY, { expiresIn: "14d" });

      res
        .status(200)
        .set({ accessToken: `Bearer ${accessToken}`, refreshToken })
        .send({ message: "로그인성공" });
    } catch (err) {
      console.log(err);
      console.trace(err);
      res.status(400).send({ errorMessage: "로그인실패" });
    }
  },
};
