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

    findAll = async () => {
        return await Posts.findAll();
    };
}

export default new PostsRepository();
