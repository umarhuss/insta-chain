import { useState, useEffect } from "react";
import PostCard from "../components/postCard";
import type { Post, Comment } from "../types";
import { getContract } from "../utils/contract";
import useWallet from "../hooks/useWallet";
import { BrowserProvider } from "ethers";
import CreatePost from "./createPost"; // Used inside the modal

const Feed: React.FC = () => {
  const { walletAddress } = useWallet();
  const [comments, setComments] = useState<Comment[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddComment = (postId: number, commentText: string) => {
    const newComment: Comment = {
      commentId: Date.now(),
      commenter: walletAddress
        ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : "Anonymous", // replace with username when build up
      comment: commentText,
      timestamp: new Date().toISOString(),
      postId,
    };
    setComments((prev) => [...prev, newComment]);
  };

  const loadFeed = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = await getContract(signer);
      if (!walletAddress) return;
      const userAddress = await signer.getAddress();
      // const postForFeed = await contract.getUserAndFriendsPosts(userAddress);
      const rawPosts = await contract.getUserAndFriendsPosts(userAddress);

      const parsedPosts = rawPosts.map((raw: any) => ({
        id: Number(raw[0]),
        author: raw[1],
        caption: raw[2],
        timestamp: Number(raw[3]),
        location: raw[4],
        ipfsHash: raw[5],
      }));

      // Set posts with likes
      const postsWithLikes : Post[] = await Promise.all(
        parsedPosts.map(async(post:Post) => {
          console.log("parsed post:", post);
          try{
            const[likes, hasLiked] = await Promise.all([
              contract.getLikeCount(post.id),
              contract.hasUserLikedPost(userAddress,post.id)
            ]);
            return {
              ...post,
              likes: Number(likes),
              hasLiked
            };
          } catch (error) {
              console.warn(`Skipping post ${post.id} due to error:`, error);
              return null; // Fallback
          }
        })
      );

      setPosts(postsWithLikes.filter((post) => post !== null));
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  useEffect(() => {
    loadFeed();
  }, [walletAddress]);

  return (
    <div className="feed-container">
      {/* Add Post Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
        <button onClick={() => setShowModal(true)} className="add-post-button">
          ➕ Add Post
        </button>
      </div>

      <h2>Feed</h2>

      {/* Feed Posts */}
      {posts.length === 0 ? (
        <p>No posts yet. Follow someone or create your own post!</p>
      ) : (
        <div className="post-list">
          {posts.map((post, idx) => {
            if (!post) return null; // Skip if post is null

            const commentsForPost = comments.filter(
              (comment) => comment.postId === post.id
            );
            return (
              <PostCard
                key={post.id || idx} // fallback to index if id is not available
                post={post}
                comments={commentsForPost}
                handleAddComment={handleAddComment}
              />
            );
          })}
        </div>
      )}

      {/* Modal for CreatePost */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreatePost
              onPostCreated={() => {
                setShowModal(false);
                loadFeed();
              }}
            />
            <button onClick={() => setShowModal(false)} className="close-modal-button">
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;

