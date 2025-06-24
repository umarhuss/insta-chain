const { expect } = require('chai'); // Import expect from chai
const { ethers } = require('hardhat'); // Import ethers from hardhat

// Define the test suite

// All start with describe
describe('Instachain', function (){ // function as we are wrapping the test suite into a function
    // Test cases for the Instachain contract
    it('should deploy the Instachain contract', async function(){
        // Get a blueprint for the contract
        const Instachain = await ethers.getContractFactory('InstaChain');
        // Deploy the contract using the blueprint
        const instachain = await Instachain.deploy();
        // Wait for the deployment to finish
        await instachain.deployed();
        // Check if the contract address is not zero if zero it means the contract was not deployed
        expect(instachain.address).to.not.equal(0);
    })

    it('should create a new post', async function() {
        // call the instachain contract
        const Instachain = await ethers.getContractFactory('InstaChain');
        // Deploy the contract
        const instachain = await Instachain.deploy();
        // Check deployment has happened
        await instachain.deployed();
        expect(instachain.address).to.not.equal(0);
        // create a new post
        await instachain.createPost("This is a test post","London", "northeaster.psg");
    })

    it('Should have the correct post id', async function(){
        // Call the instachain contract
        const Instachain = await ethers.getContractFactory('InstaChain');
        // Deploy the contract
        const instachain = await Instachain.deploy();
        // Check deployment has happened
        await instachain.deployed();
        expect(instachain.address).to.not.equal(0);

        // create a new post
        const caption = 'This is a test post, id should be 2';
        const location = 'London';
        const imageHash = 'northeastern.psg';

        await instachain.createPost(caption, location, imageHash);

        // Check if the post count is 1
        const postCount = await instachain.postCount();
        // postCount is a BigNumber, so we need to convert it to a number
        expect(postCount.toNumber()).to.equal(1);

    })

    // Test to check if post is liked correctly
    it('should like a post and increment like count', async function(){
        // Get the owner of the contract
        const [owner] = await ethers.getSigners();
        // Call the instachain contract
         const Instachain = await ethers.getContractFactory('InstaChain');
        // Deploy the contract
        const instachain = await Instachain.deploy();
        // Verify the contact is deployed
        await instachain.deployed();
        expect(instachain.address).to.not.equal(0);

        // Create a new post
        const caption = "This is a post to test like";
        const location = "Boston";
        const imageHash = 'imagehash123';
        await instachain.createPost(caption,location,imageHash)
        // Like the post
        await instachain.likePost(1);

        // Check if the post is liked correctly
        const is_liked = await instachain.likedPosts(owner.address, 1);
        expect(is_liked).to.equal(true);

        // check if the like count is incremented
        const likeCount = await instachain.likesCount(1);
        expect(likeCount.toNumber()).to.equal(1);
    })

    // Test to check is post is unliked correctly
    it('should unlike the post and decrement like count', async function(){
        // Get the owner of the contract
        const [owner] = await ethers.getSigners();
        // Call the instachain contract
         const Instachain = await ethers.getContractFactory('InstaChain');
        // Deploy the contract
        const instachain = await Instachain.deploy();
        // Verify the contact is deployed
        await instachain.deployed();
        expect(instachain.address).to.not.equal(0);

        // Create a new post
        const caption = "This is a post to test like";
        const location = "Boston";
        const imageHash = 'imagehash123';
        await instachain.createPost(caption,location,imageHash)
        // Like the post
        await instachain.likePost(1)
        // Check if the post is liked correctly
        const is_liked = await instachain.likedPosts(owner.address, 1);
        expect(is_liked).to.equal(true);

        // check if the like count is incremented
        const likeCount = await instachain.likesCount(1);
        expect(likeCount.toNumber()).to.equal(1);

        // unlike the post
        await instachain.unlikePost(1)

        // check the post is unliked
        const is_unliked = await instachain.likedPosts(owner.address,1);
        expect(is_unliked).to.equal(false);

        // Check if the like count is decremented
        const newLikeCount = await instachain.likesCount(1);
        expect(newLikeCount.toNumber()).to.equal(0);
    })

    // Test the return of user posts
    it('should return user posts and details', async function(){
        // Get the owner of the contract
        const [owner] = await ethers.getSigners();
        // Call the instachain contract
        const Instachain = await ethers.getContractFactory('InstaChain');
        // Deploy the contract
        const instachain = await Instachain.deploy();
        // Verify the contact is deployed
        await instachain.deployed();
        expect(instachain.address).to.not.equal(0);

        // Create a new post
        const caption = "This is a post to test user posts";
        const location = "Boston";
        const imageHash = 'imagehash123';
        await instachain.createPost(caption,location,imageHash)

        // Get the user posts
        const userPosts = await instachain.getUserPosts(owner.address);

        // Check it the user post is added correctly
        expect(userPosts.length).to.equal(1);
        expect(userPosts[0].toNumber()).to.equal(1);

        // Check the post details
        const post = await instachain.getPost(1);
        expect(post.caption).to.equal(caption);
        expect(post.location).to.equal(location);
        expect(post.ipfsHash).to.equal(imageHash)

    })

    // Test commenting on posts
    it('should comment on a post and increment comment count', async function(){
        // Get the owner of the contract
        const [owner] = await ethers.getSigners();

        // Call the instachain contract
        const Instachain = await ethers.getContractFactory('InstaChain');

        // Deploy the contract
        const instachain = await Instachain.deploy();

        // Verify the contact is deployed
        await instachain.deployed();
        expect(instachain.address).to.not.equal(0);

        // Create a new post
        const caption = "This is a post to test user commenting on posts";
        const location = "Dubai";
        const imageHash = 'imagehash123';
        await instachain.createPost(caption,location,imageHash)

        // Check post id
        const post = await instachain.getUserPosts(owner.address);
        expect(post[0].toNumber()).to.equal(1);

        // Comment on the post
        const comment = 'This is a comment on the post';
        await instachain.commentOnPost(1, comment, 0);

        // Check the comment count and comment details
        const commentCount = await instachain.commentCount();
        expect(commentCount.toNumber()).to.equal(1);
        const comments = await instachain.getComments(1);
        expect(comments[0].comment).to.equal(comment);

        // Reply to the comment
        const reply = 'This is a reply to the comment';
        await instachain.commentOnPost(1, reply, 1);

        // Check the reply to comment is correct
        const replies = await instachain.getComments(1);
        expect(replies[1].comment).to.equal(reply);
    })

})
