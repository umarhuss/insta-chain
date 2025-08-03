import { BrowserProvider } from 'ethers';
import { Clock, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import useWallet from '../hooks/useWallet';
import type { Comment, Post } from '../types';
import { getContract } from '../utils/contract';

const Posts: React.FC = () => {
  const { walletAddress } = useWallet();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (walletAddress) {
      fetchUserPosts();
    }
  }, [walletAddress]);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      const contract = await getContract(signer);

      // Get user's address
      const userAddress = await signer.getAddress();
      console.log('Fetching posts for user:', userAddress);

      // Get all posts (user and friends)
      const rawPosts = await contract.getUserAndFriendsPosts(userAddress);
      console.log('Raw posts from contract:', rawPosts);

      const parsedPosts = rawPosts.map((raw: any) => ({
        id: Number(raw[0]),
        author: raw[1],
        caption: raw[2],
        timestamp: Number(raw[3]),
        location: raw[4],
        ipfsHash: raw[5],
      }));

      // Filter for only user's posts
      const userPosts = parsedPosts.filter((post: any) =>
        post.author.toLowerCase() === userAddress.toLowerCase()
      );

      console.log('User posts after filtering:', userPosts);

      // Set posts with likes
      const postsWithLikes: Post[] = await Promise.all(
        userPosts.map(async(post: any) => {
          console.log("Processing user post:", post);
          try{
            const[likes, hasLiked, username] = await Promise.all([
              contract.getLikeCount(post.id),
              contract.hasUserLikedPost(userAddress, post.id),
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

      const validPosts = postsWithLikes.filter((post) => post !== null);
      setPosts(validPosts);
      console.log('Final user posts:', validPosts);

      // Get comments for all user posts
      const allComments: Comment[] = [];
      for (const post of validPosts) {
        try {
          const commentCount = await contract.getCommentCount(post.id);
          for (let j = 1; j <= commentCount; j++) {
            try {
              const comment = await contract.comments(post.id, j);
              allComments.push({
                commentId: j,
                postId: post.id,
                commenter: comment.commenter,
                comment: comment.comment,
                timestamp: comment.timestamp.toNumber()
              });
            } catch (error) {
              console.log(`Error fetching comment ${j} for post ${post.id}:`, error);
            }
          }
        } catch (error) {
          console.log(`Error fetching comments for post ${post.id}:`, error);
        }
      }

      setComments(allComments);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleAddComment = async (postId: number, commentText: string) => {
  //   try {
  //     const provider = new BrowserProvider(window.ethereum!);
  //     const signer = await provider.getSigner();
  //     const contract = await getContract(signer);
  //     const tx = await contract.addComment(postId, commentText);
  //     await tx.wait();
  //     fetchUserPosts();
  //   } catch (error) {
  //     console.error('Error adding comment:', error);
  //   }
  // };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getExtension = (url: string) => {
    return url?.split('.').pop()?.toLowerCase() || "";
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="content-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading your posts...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="content-container">
        <div className="feed-header">
          <h1 className="feed-title">Your Posts</h1>
          <p className="text-secondary">You have {posts.length} post{posts.length !== 1 ? 's' : ''}</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center p-6">
            <p className="text-secondary mb-4">You haven't posted anything yet.</p>
            <p className="text-muted">Create your first post to see it here!</p>
            <p className="text-xs text-muted mt-2">Debug: Wallet address: {walletAddress}</p>
          </div>
        ) : (
          posts.map((post) => {
            const ext = getExtension(post.ipfsHash || "");
            const mediaUrl = `https://gateway.pinata.cloud/ipfs/${post.ipfsHash}`;
            const postComments = comments.filter(c => c.postId === post.id);

            return (
              <div key={post.id} className="post-card">
                {/* Post Header */}
                <div className="post-header">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                      <User size={16} />
                    </div>
                    <div>
                      <div className="post-author">{post.username}</div>
                      <div className="post-timestamp flex items-center gap-1">
                        <Clock size={12} />
                        {formatTimestamp(post.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media */}
                <div className="post-media-container">
                  {ext === "mp4" || ext === "webm" ? (
                    <video
                      className="post-media"
                      controls
                      preload="metadata"
                    >
                      <source src={mediaUrl} type={`video/${ext}`} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={mediaUrl}
                      alt={post.caption}
                      className="post-media"
                      loading="lazy"
                      onError={(e) => {
                        console.error('Image failed to load:', mediaUrl);
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', mediaUrl);
                      }}
                    />
                  )}
                </div>

                {/* Post Content */}
                <div className="post-content">
                  {post.caption && (
                    <p className="post-caption">{post.caption}</p>
                  )}

                  {/* Actions */}
                  <div className="post-actions">
                    <div className="likes-count">
                      ❤️ {post.likes} {post.likes === 1 ? 'like' : 'likes'}
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="comments-section">
                    <div className="comments-header">
                      Comments ({postComments.length})
                    </div>

                    {postComments.length > 0 ? (
                      postComments.map((comment) => (
                        <div key={comment.commentId} className="comment">
                          <div className="comment-author">{comment.commenter}</div>
                          <div className="comment-text">{comment.comment}</div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted text-center py-2 text-xs">No comments yet.</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Posts;
