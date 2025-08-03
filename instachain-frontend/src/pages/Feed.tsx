import { BrowserProvider } from "ethers";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import PostCard from "../components/postCard";
import useWallet from "../hooks/useWallet";
import type { Comment, Post } from "../types";
import { getContract } from "../utils/contract";
import CreatePost from "./createPost";

const Feed: React.FC = () => {
  const { walletAddress } = useWallet();
  const [comments, setComments] = useState<Comment[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleAddComment = async (postId: number, commentText: string) => {
    try {
      // Fetch username for the current user
      const provider = new BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      const contract = await getContract(signer);
      const username = await contract.getUsername(walletAddress);

      const newComment: Comment = {
        commentId: Date.now(),
        commenter: username || formatAddress(walletAddress || ""), // Use username if available, otherwise format address
        comment: commentText,
        timestamp: new Date().toISOString(),
        postId,
      };
      setComments((prev) => [...prev, newComment]);
    } catch (error) {
      console.error('Error fetching username for comment:', error);
      // Fallback to formatted address if username fetch fails
      const newComment: Comment = {
        commentId: Date.now(),
        commenter: formatAddress(walletAddress || ""),
        comment: commentText,
        timestamp: new Date().toISOString(),
        postId,
      };
      setComments((prev) => [...prev, newComment]);
    }
  };

  const loadFeed = async () => {
    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      const contract = await getContract(signer);
      if (!walletAddress) return;
      const userAddress = await signer.getAddress();

      const rawPosts = await contract.getUserAndFriendsPosts(userAddress);

      const parsedPosts = rawPosts.map((raw: any) => ({
        id: Number(raw[0]),
        author: raw[1],
        caption: raw[2],
        timestamp: Number(raw[3]),
        location: raw[4],
        ipfsHash: raw[5],
      }));

      console.log("🔍 Raw posts from contract:", rawPosts);
      console.log("🔍 Parsed posts:", parsedPosts);

      // Set posts with likes
      const postsWithLikes : Post[] = await Promise.all(
        parsedPosts.map(async(post:Post) => {
          console.log("parsed post:", post);
          try{
            const[likes, hasLiked, username] = await Promise.all([
              contract.getLikeCount(post.id),
              contract.hasUserLikedPost(userAddress,post.id),
              contract.getUsername(post.author)
            ]);
            return {
              ...post,
              likes: Number(likes),
              hasLiked,
              username: username || formatAddress(post.author) // Use username if available, otherwise format address
            };
          } catch (error) {
              console.warn(`Skipping post ${post.id} due to error:`, error);
              return null;
          }
        })
      );

      setPosts(postsWithLikes.filter((post) => post !== null));
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = () => {
    loadFeed();
  };

  useEffect(() => {
    loadFeed();
  }, [walletAddress]);

  return (
    <div className="main-content">
      <div className="content-container">
        {/* Feed Header */}
        <div className="feed-header">
          <h1 className="feed-title">Your Feed</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="add-post-button"
          >
            <Plus size={20} />
            Create Post
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <Loader2 className="loading-spinner" size={32} />
            <span className="loading-text">Loading your feed...</span>
          </div>
        )}

        {/* Feed Posts */}
        {!loading && posts.length === 0 ? (
          <div className="card text-center">
            <div className="space-y-4">
              <div className="text-6xl">📸</div>
              <h3 className="text-xl font-semibold text-gray-900">
                No posts yet
              </h3>
              <p className="text-gray-600">
                Start by creating your first post or follow some friends to see their content!
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                <Plus size={16} />
                Create Your First Post
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, idx) => {
              if (!post) return null;

              const commentsForPost = comments.filter(
                (comment) => comment.postId === post.id
              );
              return (
                <PostCard
                  key={post.id || idx}
                  post={post}
                  comments={commentsForPost}
                  handleAddComment={handleAddComment}
                />
              );
            })}
          </div>
        )}

        {/* Create Post Modal */}
        <CreatePost
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onPostCreated={handlePostCreated}
        />
      </div>
    </div>
  );
};

export default Feed;

