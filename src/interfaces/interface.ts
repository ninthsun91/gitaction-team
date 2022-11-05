interface UserI {
    userId?: number;
    name: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}

interface CommentInterface {
    commentId?: number;
    userId: number;
    postId: number;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
}


export { UserI, CommentInterface }
