import React, { useState } from "react";
import imageCompression from 'browser-image-compression';
import { uploadToIPFS } from '../utils/uploadtoIPFS';
import { getContract } from '../utils/contract';
import { BrowserProvider } from 'ethers';

type Props = {
  onPostCreated: () => void;
};

const CreatePost: React.FC<Props> = ({ onPostCreated }) => {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const getLocation = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude.toFixed(4);
            const lon = position.coords.longitude.toFixed(4);
            resolve(`${lat},${lon}`);
          },
          (error) => {
            console.error("Geolocation error:", error);
            reject("Unable to retrieve location");
          }
        );
      }
    });
  };

  const handleCreatePost = async () => {
    if (!imageFile) {
      alert("Please select an image or video to upload.");
      return;
    }

    if (imageFile.size > 5 * 1024 * 1024) {
      alert("File is too large. Please upload a file under 5MB.");
      return;
    }

    console.log("Getting location...");
    const userLocation = await getLocation();
    console.log("Location:", userLocation);

    console.log("Selected file:", imageFile);
    console.log("File type:", imageFile?.type);

    const isImage = imageFile.type.startsWith("image/");
    const isVideo = imageFile.type.startsWith("video/");

    let fileToUpload: File;

    try {
      const userLocation = await getLocation();

      // If image → compress it
      if (isImage) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        console.log("Compressing image...");
        fileToUpload = await imageCompression(imageFile, options);
        console.log("Image compressed from", imageFile.size / 1024, "KB to", fileToUpload.size / 1024, "KB");
      }

      // If video → check duration (must be under 10 seconds)
      else if (isVideo) {
        console.log("Checking video duration...");
        const videoURL = URL.createObjectURL(imageFile);
        const videoElement = document.createElement("video");

        const duration = await new Promise<number>((resolve, reject) => {
          videoElement.preload = "metadata";
          videoElement.onloadedmetadata = () => {
            URL.revokeObjectURL(videoURL);
            resolve(videoElement.duration);
          };
          videoElement.onerror = () => {
            reject("Error loading video metadata.");
          };
          videoElement.src = videoURL;
        });

        console.log("Video duration:", duration);

        if (duration > 10) {
          alert("Video is too long. Please upload a video under 10 seconds.");
          return;
        }

        fileToUpload = imageFile;
      } else {
        alert("Unsupported file type. Please upload an image or a short video.");
        return;
      }

      // Upload to IPFS
      console.log("Uploading to IPFS...");
      const ipfsUrl = await uploadToIPFS(fileToUpload);
      console.log("Uploaded to IPFS:", ipfsUrl);

      const ipfsHash = ipfsUrl.split('/').pop();
      console.log("Extracted IPFS hash:", ipfsHash);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);

      console.log("Creating post on blockchain...");

      console.log("Smart contract interaction starting...");
      console.log("Caption:", caption);
      console.log("Location:", userLocation);
      console.log("IPFS Hash:", ipfsHash);
      console.log("Contract instance:", contract);
      console.log("Function available?", typeof contract.createPost === "function");


      const tx = await contract.createPost(caption, userLocation, ipfsHash);
      await tx.wait();
      onPostCreated();

      alert("Post successfully created on blockchain!");
      setCaption('');
      setImageFile(null);
    } catch (error: any) {
        console.error("❌ Error during post creation:", error);

        if (error?.reason) {
            console.error("🧠 Reason:", error.reason);
        }
        if (error?.message) {
            console.error("📜 Message:", error.message);
        }
        if (error?.stack) {
            console.error("📚 Stack:", error.stack);
        }

        alert("Something went wrong. Check the browser console for details.");
    }
  };

  return (
    <div>
      <h2>Create a new post</h2>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={e => setImageFile(e.target.files?.[0] || null)}
      />
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={e => setCaption(e.target.value)}
      />
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default CreatePost;
