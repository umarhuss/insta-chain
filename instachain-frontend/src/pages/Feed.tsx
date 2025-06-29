import React from "react";
import PostCard from "../components/postCard";

const Feed: React.FC =() => {
    const Posts = [
        {
            postId: 1,
            author: "0x1234...abcd",
            imageUrl: "https://via.placeholder.com/300",
            caption: "Hello from the blockchain!",
            timestamp: "2025-06-30T12:00:00Z",
            likes: 123,
        },
        {
            postId: 2,
            author: "0x5678...efgh",
            imageUrl: "https://via.placeholder.com/300",
            caption: "Another day, another block!",
            timestamp: "2025-06-30T12:00:00Z",
            likes: 456,
        },
        {
            postId: 3,
            author: "0x9012...ijkl",
            imageUrl: "https://via.placeholder.com/300",
            caption: "Exploring the metaverse!",
            timestamp: "2025-06-30T12:00:00Z",
            likes: 789,
        }
    ]

        return (
        <div>
            <h2>Feed</h2>
            <div>
                {Posts.map((post) =>(
                    <PostCard key={post.postId} post={post} />
                ))}
            </div>
        </div>


    )

}
export default Feed;
