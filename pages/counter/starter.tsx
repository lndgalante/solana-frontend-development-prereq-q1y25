import { useConnection } from "@solana/wallet-adapter-react";
import { useWallet } from "@solana/wallet-adapter-react";
import BoilerPlate from "../../components/BoilerPlate";

const Starter = () => {
	// connection context object that is injected into the browser by the wallet
	const { connection } = useConnection();
	console.log("\n ~ Starter ~ connection:", connection);
	// user's public key of the wallet they connected to our application
	const { publicKey } = useWallet();
	console.log("\n ~ Starter ~ publicKey:", publicKey);

	return <BoilerPlate />;
};

export default Starter;
