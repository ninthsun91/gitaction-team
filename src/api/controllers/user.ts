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

  userInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const userInfo = await User.userInfo(+userId);

      res.status(200).json({ data: userInfo });
    } catch (err) {
      console.log(err);
      console.trace(err);
      res.status(400).send({ errorMessage: "유저정보 조회 실패" });
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { password, newPassword } = req.body;

      if (!password || !newPassword) throw new Error("패스워드미입력");

      const userUpdate = { userId: +userId, password, newPassword };

      await User.updateUser(userUpdate);

      res.status(200).send({ message: "회원정보수정성공" });
    } catch (err) {
      console.log(err);
      console.trace(err);
      res.status(400).send({ errorMessage: "회원정보수정실패" });
    }
  },
};
