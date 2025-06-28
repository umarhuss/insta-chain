import { useEffect } from "react";
import useWallet from "../hooks/useWallet";
import { useNavigate } from 'react-router-dom';
import ConnectWallet from "../components/connectWallet";


const Home: React.FC = () => {
    const { walletAddress } = useWallet();
    const navigate = useNavigate();

    useEffect(() => {
        if (walletAddress){
            navigate('/feed');
        }
    }, [walletAddress, navigate]);

    return (
        <div>
            <h2>Instachain</h2>
            {/* Show connect button if not connected */}
            {!walletAddress && <ConnectWallet />}
        </div>
    )
}

export default Home;
