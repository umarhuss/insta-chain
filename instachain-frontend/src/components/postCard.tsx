import { Clock, Heart, MessageCircle, Send, User } from 'lucide-react';
import React, { useEffect, useState } from "react";
import type { Comment, Post } from "../types";

type props = {
    post: Post;
    comments: Comment[];
    handleAddComment : (postId: number, commentText: string) => void;
};

const PostCard: React.FC<props> = ({post, comments, handleAddComment}) => {
    const [likes, setlike] = useState(post.likes)
    const [hasLiked, setHasLiked] = useState(post.hasLiked)
    const [textarea, setTextarea] = useState('')
    const [showComments, setShowComments] = useState(false)

    const latestComments = comments.slice(-3);

    const togglelikes = () => {
        if(!hasLiked){
            setlike(likes+1)
            setHasLiked(true)
        } else {
            setlike(likes -1)
            setHasLiked(false)
        };
    };

    const addComment = () => {
        if (!textarea.trim()) return;
        handleAddComment(post.id, textarea)
        console.log('comment successfully submitted:\n',textarea)
        setTextarea("")
    }

    const getExtension = (url: string) => {
        // If it's an IPFS hash, we need to determine the file type differently
        // For now, let's assume it's an image since that's most common
        if (url && url.startsWith('Qm')) {
            return 'jpg'; // Default to jpg for IPFS hashes
        }
        return url?.split('.').pop()?.toLowerCase() || "jpg";
    };

    const ext = getExtension(post.ipfsHash || "");
    const mediaUrl = `https://gateway.pinata.cloud/ipfs/${post.ipfsHash}`;
    const alternativeUrl = `https://ipfs.io/ipfs/${post.ipfsHash}`;
    const cloudflareUrl = `https://cloudflare-ipfs.com/ipfs/${post.ipfsHash}`;
    const dwebUrl = `https://dweb.link/ipfs/${post.ipfsHash}`;

    // Temporary test image for debugging
    const testImageUrl = "https://picsum.photos/300/200?random=1";

    console.log("🖼️ Post media debug:", {
        ipfsHash: post.ipfsHash,
        mediaUrl: mediaUrl,
        alternativeUrl: alternativeUrl,
        extension: ext,
        caption: post.caption
    });

    // Test if IPFS content is accessible
    useEffect(() => {
        if (post.ipfsHash) {
            fetch(mediaUrl, { method: 'HEAD' })
                .then(response => {
                    console.log("🔗 IPFS accessibility test:", {
                        url: mediaUrl,
                        status: response.status,
                        accessible: response.ok
                    });
                })
                .catch(error => {
                    console.warn("⚠️ IPFS accessibility test failed:", error);
                });
        }
    }, [post.ipfsHash, mediaUrl]);

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

    return (
        <div className="post-card fade-in">
            {/* Post Header */}
            <div className="post-header">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                        <User size={16} />
                    </div>
                    <div>
                        <div className="post-author">{post.username || formatAddress(post.author)}</div>
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
                        src={mediaUrl} // Use actual IPFS hash
                        alt={post.caption}
                        className="post-media"
                        loading="lazy"
                        onError={(e) => {
                            console.error("❌ Image failed to load:", e.currentTarget.src);
                            // Try alternative gateway
                            if (e.currentTarget.src === mediaUrl) {
                                console.log("🔄 Trying alternative gateway:", alternativeUrl);
                                e.currentTarget.src = alternativeUrl;
                            } else if (e.currentTarget.src === alternativeUrl) {
                                console.log("🔄 Trying Cloudflare gateway:", cloudflareUrl);
                                e.currentTarget.src = cloudflareUrl;
                            } else if (e.currentTarget.src === cloudflareUrl) {
                                console.log("🔄 Trying dweb gateway:", dwebUrl);
                                e.currentTarget.src = dwebUrl;
                            } else {
                                // All gateways failed, show placeholder
                                console.log("❌ All gateways failed, showing placeholder");
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.style.backgroundColor = '#f3f4f6';
                                e.currentTarget.parentElement!.style.display = 'flex';
                                e.currentTarget.parentElement!.style.alignItems = 'center';
                                e.currentTarget.parentElement!.style.justifyContent = 'center';
                                e.currentTarget.parentElement!.style.minHeight = '200px';
                                e.currentTarget.parentElement!.innerHTML = '<span style="color: #6b7280; font-size: 14px;">Image not available</span>';
                            }
                        }}
                        onLoad={(e) => {
                            console.log("✅ Image loaded successfully:", e.currentTarget.src);
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
                    <button
                        onClick={togglelikes}
                        className={`like-button ${hasLiked ? 'liked' : ''}`}
                    >
                        <Heart size={16} fill={hasLiked ? 'currentColor' : 'none'} />
                        <span>{hasLiked ? 'Liked' : 'Like'}</span>
                    </button>

                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="like-button"
                    >
                        <MessageCircle size={16} />
                        <span>Comments</span>
                    </button>

                    <div className="likes-count">
                        ❤️ {likes} {likes === 1 ? 'like' : 'likes'}
                    </div>
                </div>

                {/* Comments Section */}
                {showComments && (
                    <div className="comments-section">
                        <div className="comments-header">
                            Comments ({latestComments.length})
                        </div>

                        {latestComments.length > 0 ? (
                            latestComments.map((comment) => (
                                <div key={comment.commentId} className="comment">
                                    <div className="comment-author">{comment.commenter}</div>
                                    <div className="comment-text">{comment.comment}</div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted text-center py-2 text-xs">No comments yet. Be the first to comment!</p>
                        )}

                        {/* Add Comment */}
                        <div className="comment-input">
                            <textarea
                                className="comment-textarea"
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
                            <button
                                onClick={addComment}
                                className="comment-send-button"
                                disabled={!textarea.trim()}
                            >
                                <Send size={12} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;


