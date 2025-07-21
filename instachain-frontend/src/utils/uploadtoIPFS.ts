import axios from "axios";

export async function uploadToIPFS(file: File): Promise<string> {
  const apiKey = import.meta.env.VITE_PINATA_JWT;
  console.log("Using API key starts with:", apiKey?.slice(0, 10));

  if (!apiKey) {
    throw new Error("VITE_PINATA_JWT is not defined");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const cid = response.data.IpfsHash;
    console.log("✅ Upload successful, CID:", cid);
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  } catch (error: any) {
    console.error("❌ Upload failed:", error.response?.data || error.message);
    throw new Error("Upload to IPFS failed");
  }
}
