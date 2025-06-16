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
    }

    // Function to add a comment to a post

    // Function to add a like to a post
}
