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
})
