import { Request, Response, NextFunction } from "express";
import User from "../../services/user";
import { UserI } from "../../interfaces/interface";

export default {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, password, confirm } = req.body;
      if (!name) throw new Error("이름빈값");
      if (!password || !confirm) throw new Error("비밀번호빈값");
      if (password !== confirm) throw new Error("비밀번호 불일치");

      const userInfo: UserI = { name, password };
      await User.signup(userInfo);

      res.send({ message: "회원가입 성공" });
    } catch (err) {
      console.log(err);
      res.status(400).send({ errorMessage: "회원가입 실패" });
    }
  },
};
