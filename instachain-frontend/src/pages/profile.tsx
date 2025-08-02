import { BrowserProvider } from 'ethers';
import { Camera, Check, Edit3, Loader2, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import useWallet from '../hooks/useWallet';
import { getContract } from '../utils/contract';

const Profile: React.FC = () => {
  const { walletAddress } = useWallet();
  const [username, setUsername] = useState<string>('');
  const [newUsername, setNewUsername] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fetchingUsername, setFetchingUsername] = useState(true);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [profilePic, setProfilePic] = useState<string>('');
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [uploadingPic, setUploadingPic] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'warning' } | null>(null);

  useEffect(() => {
    if (walletAddress) {
      fetchUsername();
      fetchProfilePic();
    }
  }, [walletAddress]);

  const fetchUsername = async () => {
    try {
      setFetchingUsername(true);
      const provider = new BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const user = await contract.getUsername(walletAddress);
      if (user && user !== '') {
        setUsername(user);
      }
    } catch (error) {
      console.error('Error fetching username:', error);
    } finally {
      setFetchingUsername(false);
    }
  };

  const fetchProfilePic = async () => {
    try {
      // Profile picture functionality not yet implemented in smart contract
      // const provider = new BrowserProvider(window.ethereum!);
      // const signer = await provider.getSigner();
      // const contract = getContract(signer);
      // const picHash = await contract.profilePics(walletAddress);
      // if (picHash && picHash !== '') {
      //   setProfilePic(`https://gateway.pinata.cloud/ipfs/${picHash}`);
      // }
      console.log('Profile picture functionality not yet implemented in smart contract');
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };

  const handleSetUsername = async () => {
    if (!newUsername.trim()) {
      setMessage({ text: 'Username cannot be empty', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const tx = await contract.registerUsername(newUsername.trim());
      await tx.wait();

      setUsername(newUsername.trim());
      setNewUsername('');
      setShowUsernameModal(false);
      setMessage({ text: 'Username updated successfully!', type: 'success' });

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error setting username:', error);
      setMessage({ text: 'Failed to update username', type: 'error' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePicUpload = async () => {
    if (!profilePicFile) {
      setMessage({ text: 'Please select a profile picture', type: 'error' });
      return;
    }

    try {
      setUploadingPic(true);

      // Profile picture functionality not yet implemented in smart contract
      // Upload to IPFS
      // const ipfsHash = await uploadToIPFS(profilePicFile);

      // Update on blockchain
      // const provider = new BrowserProvider(window.ethereum!);
      // const signer = await provider.getSigner();
      // const contract = getContract(signer);
      // const tx = await contract.setProfilePic(ipfsHash);
      // await tx.wait();

      // setProfilePic(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
      // setProfilePicFile(null);
      // setShowProfilePicModal(false);
      // setMessage({ text: 'Profile picture updated successfully!', type: 'success' });

      setMessage({ text: 'Profile picture functionality not yet implemented', type: 'warning' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setMessage({ text: 'Failed to upload profile picture', type: 'error' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setUploadingPic(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ text: 'Please select an image file', type: 'error' });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ text: 'Image must be smaller than 5MB', type: 'error' });
        return;
      }

      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (fetchingUsername) {
    return (
      <div className="main-content">
        <div className="content-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="content-container">
        <div className="profile-container">
          <div className="profile-header">
            <div className="relative">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                />
              ) : (
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-3">
                  <User size={32} />
                </div>
              )}
              <button
                onClick={() => setShowProfilePicModal(true)}
                className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 hover:bg-primary-hover transition-colors"
              >
                <Camera size={16} />
              </button>
            </div>

            <div className="profile-username">
              {username || 'No username set'}
            </div>
            <div className="profile-address">
              {walletAddress ? formatAddress(walletAddress) : 'No wallet connected'}
            </div>
          </div>

          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">Username</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={username || 'No username set'}
                  disabled
                  className="form-input flex-1"
                  placeholder="Set your username"
                />
                <button
                  onClick={() => setShowUsernameModal(true)}
                  className="btn-secondary"
                  disabled={loading}
                >
                  <Edit3 size={16} />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Username Modal */}
        <Modal
          isOpen={showUsernameModal}
          onClose={() => setShowUsernameModal(false)}
          title="Set Username"
        >
          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">New Username</label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="form-input"
                placeholder="Enter your username"
                maxLength={20}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowUsernameModal(false)}
                className="btn-secondary"
                disabled={loading}
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSetUsername}
                className="btn-primary"
                disabled={loading || !newUsername.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Setting...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Set Username</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>

        {/* Profile Picture Modal */}
        <Modal
          isOpen={showProfilePicModal}
          onClose={() => setShowProfilePicModal(false)}
          title="Update Profile Picture"
        >
          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-input"
              />
              <p className="text-xs text-muted mt-1">
                Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
              </p>
            </div>

            {profilePic && (
              <div className="text-center">
                <img
                  src={profilePic}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover mx-auto"
                />
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowProfilePicModal(false)}
                className="btn-secondary"
                disabled={uploadingPic}
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleProfilePicUpload}
                className="btn-primary"
                disabled={uploadingPic || !profilePicFile}
              >
                {uploadingPic ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Upload Picture</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
