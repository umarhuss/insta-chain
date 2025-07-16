import { useState, useEffect } from "react";
import PostCard from "../components/postCard";
import type { Post, Comment } from "../types";
import { getContract } from "../utils/contract";
import useWallet from "../hooks/useWallet";
import { BrowserProvider } from "ethers"





const Feed: React.FC =() => {
    const { walletAddress } = useWallet();
    // Use state to handle new comments
    const [comments, setComments] = useState<Comment[]>([]) // Will be comments list and initially be empty
    // Use state to handle the posts that will be empty
    const [posts, setPosts] = useState<Post[]>([])

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
    // UseEffect to handle what should happen when page loads/renders
    useEffect(()=>{
        const loadFeed = async () =>{
            try {
                 // Connect to MetaMask
                const provider = new BrowserProvider(window.ethereum);;
                // Get signer (the user's wallet)
                const signer = await provider.getSigner();
                // Use signer to connect to the contract
                const contract = await getContract(signer);
                if (!walletAddress) return;
                // get the current user wallet address
                const userAddress = await signer.getAddress();

                // Call your smart contract function
                const postForFeed = await contract.getUserAndFriendsPosts(userAddress);
                setPosts(postForFeed);
            } catch (error) {
                console.error("Error loading posts:", error);
            }
        };
        loadFeed()
    },[walletAddress])




    // Dummy posts
    // const Posts: Post[] = [
    //     {
    //         postId: 1,
    //         author: "0x1234...abcd",
    //         imageUrl: "https://via.placeholder.com/300",
    //         caption: "Hello from the blockchain!",
    //         timestamp: "2025-06-30T12:00:00Z",
    //         likes: 123,
    //         hasLiked: false,
    //     },
    //     {
    //         postId: 2,
    //         author: "0x5678...efgh",
    //         imageUrl: "https://via.placeholder.com/300",
    //         caption: "Another day, another block!",
    //         timestamp: "2025-06-30T12:00:00Z",
    //         likes: 456,
    //         hasLiked: false,
    //     },
    //     {
    //         postId: 3,
    //         author: "0x9012...ijkl",
    //         imageUrl: "https://via.placeholder.com/300",
    //         caption: "Exploring the metaverse!",
    //         timestamp: "2025-06-30T12:00:00Z",
    //         likes: 789,
    //         hasLiked: false,
    //     }
    // ]

        return (
        <div className="feed-container">
            <h2>Feed</h2>
            {/* if no post display a message */}
            {posts.length === 0 ? (
            <p>No posts yet. Follow someone or create your own post!</p>
            ) : (
            <div className="post-list">
                {posts.map((post) => {
                const commentsForPost = comments.filter(
                    (comment) => comment.postId === post.postId
                );

                return (
                    <PostCard
                    key={post.postId}
                    post={post}
                    comments={commentsForPost}
                    handleAddComment={handleAddComment}
                    />
                );
                })}
            </div>
            )}
        </div>
        );
}

export default Feed;
