import React from "react";

const Feed: React.FC =() => {
    const Posts = [
        {
            author: "0x1234...abcd",
            imageUrl: "https://via.placeholder.com/300",
            caption: "Hello from the blockchain!",
            timestamp: "2025-06-30T12:00:00Z",
            likes: 123,
        },
        {
            author: "0x5678...efgh",
            imageUrl: "https://via.placeholder.com/300",
            caption: "Another day, another block!",
            timestamp: "2025-06-30T12:00:00Z",
            likes: 456,
        },
        {
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
                {Posts.map((post, index) =>(
                    <div key = {index}>
                        <img src={post.imageUrl} alt={post.caption} />
                        <p>{post.caption}</p>
                        <p>By: {post.author}</p>
                        <p>❤️ {post.likes}</p>
                        <p>Posted on: {new Date(post.timestamp).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>


    )

}
export default Feed;
