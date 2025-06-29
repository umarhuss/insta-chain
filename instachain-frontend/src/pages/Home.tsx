import useWallet from "../hooks/useWallet";
import ConnectWallet from "../components/connectWallet";


const Home: React.FC = () => {
    const { walletAddress } = useWallet();

    return (
        <div>
            <h2>Instachain</h2>
            {/* Show connect button if not connected */}
            {!walletAddress && <ConnectWallet />}
        </div>
    )
}

export default Home;
