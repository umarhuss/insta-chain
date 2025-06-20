// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// This will be the contract for the Instachain project
contract InstaChain {
    // Struct to hold the post
    struct Post {
        address author;
        string caption;
        uint256 timestamp;
        string location;
        string ipfsHash;
    }

    // Map id to post for storage
    uint256 public postCount;
    mapping(uint256 => Post) public posts;

    // Map a person to posts they have liked
    mapping(address => mapping(uint256 => bool)) public likedPosts;

    // Map a person to a post they have created
    mapping(address => uint256[]) public userPosts;

    // Function to create a new post
    function createPost(
        string memory _caption,
        string memory _location,
        string memory _ipfsHash
    ) public {
        postCount++;
        posts[postCount] = Post(
            msg.sender,
            _caption,
            block.timestamp,
            _location,
            _ipfsHash
        );
        // Add post id to user posts mapping
        userPosts[msg.sender].push(postCount);
    }
    // Function or like post
    function likePost(uint _postId) public {
        // Check if post exists
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        // if logic to like a post
        require(
            !likedPosts[msg.sender][_postId],
            // throw error if post is already liked
            "You have already liked this post"
        );
        // Logic to like a post when it is not already liked
        likedPosts[msg.sender][_postId] = true;
    }

    // Count the number of likes on a post

    // Unlike post function

    // Return the posts of a user

    // Return the liked posts of a user

    // Comment on a post
}
