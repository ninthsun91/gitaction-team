import { Router } from 'express';
import { CommentController } from '../controllers';

const router = Router();


router.route('/:postId')
    .get(CommentController.findOne)
    .post(CommentController.create);

router.route('/:commentId')
    .patch(CommentController.updateOne)
    .delete(CommentController.deleteOne);


export default router;