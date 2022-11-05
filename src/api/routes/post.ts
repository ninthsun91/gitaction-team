import { NextFunction, request, Request, Response, Router } from 'express';
import { Where } from 'sequelize/types/utils';
import Users from '../../db/models/user';
// import Post from '../controllers/post';
import Post from '../../db/models/post';
import { number } from 'joi';
import Posts from '../../db/models/post';

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
        order: [['createdAt', 'DESC']],
        include: {
          model: Users,
          attributes: ['name'],
        },
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
      interface PorstForm {
        title: string;
        content: string;
      }

      const userId: number = 1;
      const { title, content }: PorstForm = req.body;

      const post = {
        userId,
        title,
        content,
      };

      await Post.create(post);

      res.status(201).json({ msg: 'SUCCESS' });
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
router
  .route('/:postId')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;

      const post = await Post.findOne({
        where: { postId },
        include: {
          model: Users,
          attributes: ['name'],
        },
      });

      if (!post) throw new Error(`Can not found post: ${postId}`);

      res.status(200).json({ data: post });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: `${error}` });
    }
  });

/**
 * UPDATE POST
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: { title, content }
 * response: { message }
 */
router
  .route('/:postId')
  .put(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = 1;
      const { postId } = req.params;
      const { title, content } = req.body;

      // is your Post?
      const isMine = await Post.findOne({ where: { userId, postId } });
      if (isMine === null) throw new Error(`Is not your post : ${req.params}`);

      const newPost = { title, content };

      await Post.update(
        { ...newPost, updatedAt: new Date().toLocaleString() },
        { where: { postId } },
      );

      res.status(201).json({ msg: 'SUCCESS' });
    } catch (error) {
      res.sendStatus(400);
    }
  });

/**
 * DELETE POST
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request:
 * response: { message }
 */
router
  .route('/:postId')
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = 2;
      const { postId } = req.params;

      const isMine = await Post.findOne({ where: { userId, postId } });
      if (isMine === null) throw new Error(`Is not your post : ${postId}`);

      await Posts.destroy({ where: { postId } });

      res.status(200).json({ msg: 'SUCCESS' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: `${error}` });
    }
  });

export default router;
