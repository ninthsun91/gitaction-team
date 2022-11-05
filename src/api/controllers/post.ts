import { NextFunction, Request, Response } from 'express';
import Post from '../../services/post';

class PostController {
    findAll = async (req: Request, res: Response, next: NextFunction) => {};
}
export default new PostController();
