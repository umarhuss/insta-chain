import React from "react";

// Define the post and its types
type Post = {
    postId: number;
    author: string;
    imageUrl: string;
    caption: string;
    timestamp: string;
    likes: number;
};

// Define hte props expected by the component
type props = {
    post: Post;
};

const PostCard: React.FC<props> = ({post})=>{
    return (
        <div>
            {/* Add post content */}
            {/* For debugging only: <p>ID: {post.postId}</p> */}
            <img src={post.imageUrl} alt={post.caption} />
            <p>{post.caption}</p>
            <p>By: {post.author}</p>
            <p>❤️ {post.likes}</p>
            <p>Posted on: {new Date(post.timestamp).toLocaleDateString()}</p>
        </div>
    );
};

export default PostCard
