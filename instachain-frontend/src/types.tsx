// Define the post and its types
export type Post = {
    postId: number;
    author: string;
    imageUrl: string;
    caption: string;
    timestamp: string;
    likes: number;
    hasLiked: boolean
};

export type Comment = {
    commentId: number;
    commenter: string;
    comment: string;
    timestamp: string;
    postId: number;
};
