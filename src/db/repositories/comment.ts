import Comments from "../models/comment";
import Users from "../models/user";
import { CommentInterface } from '../../interfaces/interface';


class CommentRepository {

    async findAll(postId: number) {
        return await Comments.findAll({
            where: { postId },
            include: {
                model: Users,
            }
        });
    }

    async create(comment: CommentInterface) {
        return await Comments.create(comment);
    }

    async updateOne({ commentId, comment }: Partial<CommentInterface>) {
        return await Comments.update({ comment }, {
            where: { commentId }
        });
    }

    async deleteOne(commentId: number) {
        return await Comments.destroy({
            where: { commentId }
        });
    }
}


export default new CommentRepository();