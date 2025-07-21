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
      const postForFeed = await contract.getUserAndFriendsPosts(userAddress);
      setPosts(postForFeed);
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
          {posts.map((post) => {
            const commentsForPost = comments.filter(
              (comment) => comment.postId === post.id
            );
            return (
              <PostCard
                key={post.id}
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

