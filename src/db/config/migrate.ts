import sequelize from './connection';
import Comments from '../models/comment';
import Posts from '../models/post';

(async () => {
    await Posts.drop();
    await Comments.drop();

    await Comments.sync();
    await Posts.sync();

    sequelize.close();
})();
