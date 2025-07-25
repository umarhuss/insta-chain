import React, { useState } from "react";
import type { Post, Comment } from "../types";
import {Send} from 'lucide-react';

// Define the props expected by the component
type props = {
    post: Post;
    comments: Comment[];
    handleAddComment : (postId: number, commentText: string) => void; // accepts the function
};




const PostCard: React.FC<props> = ({post, comments, handleAddComment})=>{
    // States for toggle
    const [likes, setlike] = useState(post.likes)
    const [hasLiked, setHasLiked] = useState(post.hasLiked)

    const latestComments = comments.slice(-3);

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

    // Track the textarea via use state
    const [textarea, setTextarea] = useState('')

    const addComment = () => {
        // If text area is empty with no white spaces do nothing
        if (!textarea.trim())
            return;
        // Else add call the handleAddComment function
        handleAddComment(post.id, textarea)
        // console.log for debugging
        console.log('comment successfully submitted:\n',textarea)
        // Clear the text area
        setTextarea("")
    }
    // Get file extension
    const getExtension = (url: string) => {
        return url?.split('.').pop()?.toLowerCase() || "";
    };

    const ext = getExtension(post.ipfsHash || "");
    const mediaUrl = `https://gateway.pinata.cloud/ipfs/${post.ipfsHash}`;



  return (
    <div className="post-card">
      {/* Render image or video */}
      {ext === "mp4" || ext === "webm" ? (
        <video width="100%" controls>
          <source src={mediaUrl} type={`video/${ext}`} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={mediaUrl} alt={post.caption} width="100%" />
      )}

      {/* Post content */}
      <p>{post.caption}</p>
      <p>By: {post.author}</p>
      <p>Posted on: {post.timestamp ? new Date(Number(post.timestamp) * 1000).toLocaleDateString() : "Unknown date"}</p>

      <button onClick={togglelikes}>
        {hasLiked ? "💔 Unlike" : "❤️ Like"}
      </button>
      <p>❤️ {likes}</p>

      {/* Comments */}
      <div>
        <h4>Comments</h4>
        {latestComments.map((comment) => (
          <p key={comment.commentId}>
            <strong>{comment.commenter}:</strong> {comment.comment}
          </p>
        ))}

        {/* Add a comment */}
        <div>
          <textarea
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
            placeholder="Write a comment..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addComment();
              }
            }}
          />
          <button onClick={addComment}>
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;


