import React, { useState } from "react";
import type { Post, Comment } from "../types";

// Define hte props expected by the component
type props = {
    post: Post;
    comments: Comment[];
};




const PostCard: React.FC<props> = ({post, comments})=>{
    // States for toggle
    const [likes, setlike] = useState(post.likes)
    const [hasLiked, setHasLiked] = useState(post.hasLiked)

    // Toggle the hasliked state
    const togglelikes = () =>{
        if(!hasLiked){
            setlike(likes+1)
            setHasLiked(true)
        } else {
            setlike(likes -1)
            setHasLiked(false)
        };
    };

    return (
        <div>
            {/* Add post content */}
            {/* For debugging only: <p>ID: {post.postId}</p> */}
            <img src={post.imageUrl} alt={post.caption} />
            <p>{post.caption}</p>
            <p>By: {post.author}</p>
            <button onClick = {togglelikes}>
                {hasLiked? '💔 Unlike' : '❤️ Like'}
            </button>
            <p> ❤️ {likes}</p>
            <p>Posted on: {new Date(post.timestamp).toLocaleDateString()}</p>

            {/* Comments section */}
            <div>
                <h4>Comments</h4>
                {comments.map((comment) => (
                <p key={comment.commentId}>
                    <strong>{comment.commenter}:</strong> {comment.comment}
                </p>
                ))}
            </div>

        </div>


    );
};


export default PostCard



