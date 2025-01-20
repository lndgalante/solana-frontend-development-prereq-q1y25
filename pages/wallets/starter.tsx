import { web3 } from "@coral-xyz/anchor";
import { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWallet } from "@solana/wallet-adapter-react";

// internals
import { BoilerPlate } from "../../components/BoilerPlate";
import type { Status } from "../../lib/types";

export default function Starter() {
	// react hoooks
	const [balance, setBalance] = useState<number>(0);
	const [status, setStatus] = useState<Status>("idle");

	// solana hooks
	const { publicKey } = useWallet();
	const { connection } = useConnection();

	// effects
	useEffect(() => {
		if (connection && publicKey) {
			setStatus("loading");

			connection
				.getBalance(publicKey)
				.then((lamports) => {
					setStatus("success");

					const balanceInUsd = lamports / web3.LAMPORTS_PER_SOL;
					const formattedBalance = balanceInUsd.toFixed(3);

					setBalance(Number(formattedBalance));
				})
				.catch((err) => {
					console.log(err);
					setStatus("error");
				});
		}
	}, [connection, publicKey]);

	return <BoilerPlate status={status} balance={balance} />;
}
