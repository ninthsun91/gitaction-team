import { Request, Response, NextFunction } from "express";
import { CommentInterface } from "../../interfaces/interface";
import { CommentService } from "../../services";


class CommentController {

    async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const postId: number = Number(req.params.postId);
    
            const commentList = await CommentService.findAll(postId);
    
            res.status(200).json({ commentList });
            
        } catch (error) {
            next(error);
        }
    };

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.params;
            const { userId } = req.app.locals.user;
            const { comment }: {comment: string} = req.body;

            const commentData: CommentInterface = {
                postId: Number(postId),
                userId: Number(userId),
                comment
            }
            await CommentService.create(commentData);

            res.status(200);
        } catch (error) {
            next(error);
        }
    };

    async updateOne(req: Request, res: Response, next: NextFunction) {
        try {
            const commentId = Number(req.params.commentId);
            const { comment }: { comment: string } = req.body;

            const result = await CommentService.updateOne({ commentId, comment });
            result ? res.status(200) : res.status(400);
        } catch (error) {
            next(error);
        }
    };

    async deleteOne(req: Request, res: Response, next: NextFunction) {
        try {
            const commentId = Number(req.params.commentId);

            const result = await CommentService.deleteOne(commentId);
            result ? res.status(200) : res.status(400);
        } catch (error) {
            next(error);
        }
    };
}


export default new CommentController();