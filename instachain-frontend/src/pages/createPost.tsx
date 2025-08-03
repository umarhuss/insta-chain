import imageCompression from 'browser-image-compression';
import { BrowserProvider } from 'ethers';
import { Camera, Loader2, Upload, X } from 'lucide-react';
import React, { useState } from "react";
import Modal from '../components/Modal';
import { getContract } from '../utils/contract';
import { uploadToIPFS } from '../utils/uploadtoIPFS';

type Props = {
  onPostCreated: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const CreatePost: React.FC<Props> = ({ onPostCreated, isOpen, onClose }) => {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

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

  const handleFileSelect = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
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

    setLoading(true);
    setUploadProgress('Getting location...');

    try {
      const userLocation = await getLocation();
      setUploadProgress('Processing file...');

      const isImage = imageFile.type.startsWith("image/");
      const isVideo = imageFile.type.startsWith("video/");

      let fileToUpload: File;

      if (isImage) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        setUploadProgress('Compressing image...');
        fileToUpload = await imageCompression(imageFile, options);
        console.log("Image compressed from", imageFile.size / 1024, "KB to", fileToUpload.size / 1024, "KB");
      } else if (isVideo) {
        setUploadProgress('Checking video duration...');
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

        if (duration > 10) {
          alert("Video is too long. Please upload a video under 10 seconds.");
          setLoading(false);
          return;
        }

        fileToUpload = imageFile;
      } else {
        alert("Unsupported file type. Please upload an image or a short video.");
        setLoading(false);
        return;
      }

      setUploadProgress('Uploading to IPFS...');
      const ipfsUrl = await uploadToIPFS(fileToUpload);
      const ipfsHash = ipfsUrl.split('/').pop();

      console.log("🔗 IPFS Debug:", {
        fullUrl: ipfsUrl,
        extractedHash: ipfsHash,
        fileType: fileToUpload.type,
        fileSize: fileToUpload.size
      });

      // Test the IPFS URL to make sure it's accessible
      try {
        const testResponse = await fetch(ipfsUrl, { method: 'HEAD' });
        console.log("🔗 IPFS URL test:", {
          url: ipfsUrl,
          status: testResponse.status,
          accessible: testResponse.ok
        });
      } catch (error) {
        console.warn("⚠️ IPFS URL test failed:", error);
      }

      setUploadProgress('Creating post on blockchain...');
      const provider = new BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      const contract = getContract(signer);

      const tx = await contract.createPost(caption, userLocation, ipfsHash);
      await tx.wait();

      setUploadProgress('Post created successfully!');
      onPostCreated();
      onClose();

      // Reset form
      setCaption('');
      setImageFile(null);
      setPreviewUrl(null);

    } catch (error: any) {
      console.error("❌ Error during post creation:", error);
      alert("Something went wrong. Check the browser console for details.");
    } finally {
      setLoading(false);
      setUploadProgress('');
    }
  };

  const handleClose = () => {
    if (!loading) {
      setCaption('');
      setImageFile(null);
      setPreviewUrl(null);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Post"
      size="lg"
    >
      <div className="space-y-6">
        {/* File Upload */}
        <div className="form-group">
          <label className="form-label">Media</label>
          <div className="file-upload">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={e => handleFileSelect(e.target.files?.[0] || null)}
              className="file-upload-input"
              disabled={loading}
            />
            <label className="file-upload-label">
              {previewUrl ? (
                <div className="text-center">
                  {imageFile?.type.startsWith('image/') ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-48 max-w-full rounded-lg mx-auto mb-4 object-contain"
                    />
                  ) : (
                    <video
                      src={previewUrl}
                      className="max-h-48 max-w-full rounded-lg mx-auto mb-4"
                      controls
                    />
                  )}
                  <p className="text-sm text-gray-600">
                    {imageFile?.name} ({(imageFile?.size ? imageFile.size / 1024 / 1024 : 0).toFixed(2)} MB)
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFileSelect(null);
                    }}
                    className="mt-2 text-red-500 hover:text-red-700"
                    disabled={loading}
                  >
                    <X size={16} />
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="file-upload-icon">
                    <Camera size={48} />
                  </div>
                  <div className="file-upload-text">
                    <strong>Click to upload</strong> or drag and drop
                    <br />
                    <span className="text-sm">Images or videos up to 5MB</span>
                  </div>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Caption */}
        <div className="form-group">
          <label className="form-label">Caption</label>
          <textarea
            className="form-input form-textarea"
            placeholder="What's on your mind?"
            value={caption}
            onChange={e => setCaption(e.target.value)}
            disabled={loading}
            rows={3}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Loader2 className="loading-spinner text-blue-500" size={20} />
              <div>
                <p className="font-medium text-blue-900">{uploadProgress}</p>
                <p className="text-sm text-blue-700">Please wait...</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePost}
            disabled={!imageFile || loading}
            className="btn-primary"
          >
            {loading ? (
              <>
                <Loader2 className="loading-spinner" size={16} />
                Creating...
              </>
            ) : (
              <>
                <Upload size={16} />
                Create Post
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePost;
