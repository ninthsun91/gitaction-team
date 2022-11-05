import Posts from '../models/post';

interface PostI {
    postId: number;
    userId: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

class PostsRepository extends Posts {
    constructor() {
        super();
    }
}

export default new PostsRepository();
