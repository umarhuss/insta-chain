import { useState } from "react";
import PostCard from "../components/postCard";
import type { Post, Comment } from "../types";

const Feed: React.FC =() => {
    // Use state to handle new comments
    const [comments, setComments] = useState<Comment[]>([]) // Will be comments list and initially be empty

    const handleAddComment = (postId: number, commentText: string) => {
        const newComment: Comment = {
            commentId: Date.now(), // temp unique Id for now
            commenter: 'Umar', // will be wallet or username
            comment: commentText,
            timestamp: new Date().toISOString(),
            postId: postId
        };

        // update the comment array using the setComments function
        setComments(prev => [...prev, newComment])
    };

    // Use state to handle the posts that will be empty
    const [posts, setPosts] = useState<Post[]>([])

    const getAllPosts = (postId, caption) =>{
        const newPost : Post = {

        }
    }

    // Dummy posts
    const Posts: Post[] = [
        {
            postId: 1,
            author: "0x1234...abcd",
            imageUrl: "https://via.placeholder.com/300",
            caption: "Hello from the blockchain!",
            timestamp: "2025-06-30T12:00:00Z",
            likes: 123,
            hasLiked: false,
        },
        {
            postId: 2,
            author: "0x5678...efgh",
            imageUrl: "https://via.placeholder.com/300",
            caption: "Another day, another block!",
            timestamp: "2025-06-30T12:00:00Z",
            likes: 456,
            hasLiked: false,
        },
        {
            postId: 3,
            author: "0x9012...ijkl",
            imageUrl: "https://via.placeholder.com/300",
            caption: "Exploring the metaverse!",
            timestamp: "2025-06-30T12:00:00Z",
            likes: 789,
            hasLiked: false,
        }
    ]

        return (
        <div>
            <h2>Feed</h2>
            <div>
                {Posts.map((post) =>{
                    // Filter comment to be ones that are linked to posts
                    const commentsForPost = comments.filter(
                        (comment) => comment.postId == post.postId
                    );

                    return <PostCard
                    key={post.postId}
                    post={post}
                    comments={commentsForPost}
                    handleAddComment = {handleAddComment} />
                })}
            </div>
        </div>


    )

}
export default Feed;




