import { useEffect } from "react";
import useWallet from "../hooks/useWallet";
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
    const { walletAddress } = useWallet();
    const navigate = useNavigate();

    // Use effect if wallet address is set redirect to feed if not homepage
    useEffect(() => {
        if (walletAddress){
            navigate('/feed');
        }
    }, [walletAddress, navigate]);

    return (
        <div>
            <h2>Instachain</h2>
        </div>
    )
}
export default Home;
