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

    // Comment struct
    struct Comment {
        uint256 id; // Unique ID for the comment
        address commenter;
        string comment;
        uint256 timestamp;
        uint256 replyTo; //ID of the comment being replied to
    }
    // Map id to post for storage
    uint256 public postCount;

    // Map post id to post
    mapping(uint256 => Post) public posts;

    // Map a person to posts they have liked
    mapping(address => mapping(uint256 => bool)) public likedPosts;

    // Mapping to store liked posts by user for easy access
    mapping(address => uint256[]) public likedPostsByUser;

    // Map a person to a post they have created
    mapping(address => uint256[]) public userPosts;

    // Count number of likes on a post mapping
    mapping(uint256 => uint256) public likesCount;

    // Mapping comments to posts
    mapping(uint256 => Comment[]) public postComments;

    // Counter to keep track of comments
    uint public commentCount;

    // Event to emit when a comment is added
    // indexed parameters are used to filter events in the UI
    event CommentAdded(
        uint256 indexed postId,
        address indexed commenter,
        uint indexed commentId,
        string comment,
        uint256 timestamp,
        uint256 replyTo
    );

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

        // Push the post id to liked posts by user mapping
        likedPostsByUser[msg.sender].push(_postId);
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
    function getUserPosts(
        address _user
    ) public view returns (uint256[] memory) {
        return userPosts[_user];
    }

    // Custom getter function to get post by id for frontend

    // Return the liked posts of a user
    function getLikedPosts(
        address _user
    ) public view returns (uint256[] memory) {
        return likedPostsByUser[_user]; // on chain functionality
    }

    // Comment on a post
    function commentOnPost(
        uint256 _postId,
        string memory _comment,
        uint256 _replyTo
    ) public {
        // Check if post exists
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        require(bytes(_comment).length > 0, "Comment cannot be empty");
        // Increment the comment count
        commentCount++;
        // Create a new comment
        Comment memory newComment = Comment(
            commentCount, //
            msg.sender,
            _comment,
            block.timestamp,
            _replyTo
        );
        // Add comment to post comments mapping
        postComments[_postId].push(newComment);

        // Emit the comment added event
        emit CommentAdded(
            _postId,
            msg.sender,
            commentCount,
            _comment,
            block.timestamp,
            _replyTo
        );
    }
}
