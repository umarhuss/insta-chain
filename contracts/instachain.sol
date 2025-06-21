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

    // Count number of likes on a post mapping
    mapping(uint256 => uint256) public likesCount;

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

        // Increment the likes count for the post
        likesCount[_postId]++;
    }
    // Unlike post function
    function unlikePost(uint256 _postId) public {
        // Check if Post exists
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        // Check if the post is liked by user before u
        require(
            likedPosts[msg.sender][_postId],
            "You have not liked this post yet"
        );
        // Logic to unlike a post
        likedPosts[msg.sender][_postId] = false;
        // Decrement the likes count for the post
        likesCount[_postId]--;
    }

    // Return the posts of a user
    function getUserPosts(address _user) public view returns (uint256[]) {
        return userPosts[_user];
    }
    // Return the liked posts of a user

    // Comment on a post
}
