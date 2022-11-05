import { CommentRepo } from "../db/repositories";
import { CommentInterface } from '../interfaces/interface';


class CommentService {

    async findAll(postId: number) {
        return CommentRepo.findAll(postId);
    };

    async create(comment: CommentInterface) {
        return CommentRepo.create(comment);
    };

    async updateOne({ commentId, comment }: Partial<CommentInterface>) {
        const result = await CommentRepo.updateOne({ commentId, comment });
        if (result[0] !== 1) {
            throw new Error('UPDATE FAIL');
        }

        return true;
    };

    async deleteOne(commentId: number) {
        const result = await CommentRepo.deleteOne(commentId);
        if (result !== 1) {
            throw new Error('DELETE FAIL');
        }

        return true;
    };
}


export default new CommentService();