import PostCard from "../components/postCard";
import type { Post } from "../types";

const Feed: React.FC =() => {
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

    const comments = [
        {
            commentId: 1,
            commenter: "0xABCD...1234",
            comment: "This is amazing!",
            timestamp: "2025-06-30T13:00:00Z",
            postId: 1,
        },
        {
            commentId: 2,
            commenter: "0xEFGH...5678",
            comment: "Love this post.",
            timestamp: "2025-06-30T13:05:00Z",
            postId: 2,
        },
        {
            commentId: 3,
            commenter: "0xWXYZ...9999",
            comment: "So cool!",
            timestamp: "2025-06-30T13:10:00Z",
            postId: 3,
        },
    ];

        return (
        <div>
            <h2>Feed</h2>
            <div>
                {Posts.map((post) =>{
                    // Filter  comment to be ones that are linked to posts
                    const commentsForPost = comments.filter(
                        (comment) => comment.postId == post.postId
                    );

                    return <PostCard key={post.postId} post={post} comments={commentsForPost} />
                })}
            </div>
        </div>


    )

}
export default Feed;




