import { Router } from 'express';
import Post from '../controllers/post';

const router = Router();

/**
 * FIND ALL POST
 * request:
 * response: { data: [...{ postId, userId, nickname, title,
 *                              createdAt, updatedAt, likes(:int) }] }
 */
router.route('/').get().post();

/**
 * CREATE POST
 * request header: { Authorization: "Bearer accessToken", Refreshtoken: "refreshToken" }
 * request: { title, content }
 * response: { message }
 */
router.route('/').post();

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
