import sequelize from "./connection";
import Comments from "../models/comment";



(async()=>{
    await Comments.drop();

    await Comments.sync();

    sequelize.close();
})();