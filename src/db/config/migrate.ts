import sequelize from "./connection";
import Comments from "../models/comment";
import Posts from "../models/post";
import Users from "../models/user";

(async () => {
  await Comments.drop();
  await Posts.drop();
  await Users.drop();

  await Users.sync();
  await Posts.sync();
  await Comments.sync();

  sequelize.close();
})();
