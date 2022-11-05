import { NextFunction, request, Request, Response, Router } from 'express';
import { Where } from 'sequelize/types/utils';
import Users from '../../db/models/user';
// import Post from '../controllers/post';
import Post from '../../db/models/post';

const router = Router();

/**
 * FIND ALL POST
 * request:
 * response: { data: [...{ postId, userId, nickname, title,
 *                              createdAt, updatedAt, likes(:int) }] }
 */
router
    .route('/')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await Post.findAll({
                order: ['createdAt', 'DESC'],
            });

            res.status(200).json({ data: posts });
        } catch (error) {
            console.log(error);
            res.sendStatus(400);
        }
    });

/**
 * CREATE POST
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: { title, content }
 * response: { message }
 */
router
    .route('/')
    .post(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: number = 1;
            const name: string = 'json';
            const { title, content } = req.body;

            const post = await Post.create({
                userId,
                name,
                title,
                content,
            });
        } catch (error) {
            console.log(error);
            res.sendStatus(400);
        }
    });

/**
 * FIND POST BY POSTID
 * request:
 * response: { data: { postId, userId, nickname, title,
 *                            content, createdAt, updatedAt } }
 */
router.route('/:postId').get();

/**
 * UPDATE POST
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: { title, content }
 * response: { message }
 */
router.route('/:postId').put();

/**
 * DELETE POST
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request:
 * response: { message }
 */
router.route('/:postId').delete();

export default router;
