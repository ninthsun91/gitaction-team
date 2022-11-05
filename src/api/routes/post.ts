import { Router } from 'express';

const router = Router();

router.route('/');
router.route('/:postId').get().put().delete();

export default router;
