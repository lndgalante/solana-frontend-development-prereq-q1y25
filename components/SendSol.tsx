"use client";

import { web3 } from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { toast } from "react-toastify";

// internals
import type { Status } from "../lib/types";

export function SendSol() {
	// react hooks
	const [amount, setAmount] = useState<number>(0);
	const [address, setAddress] = useState<string>("");

	const [status, setStatus] = useState<Status>("idle");
	const [signature, setSignature] = useState<string>("");

	// solana hooks
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	// handlers
	function handleChangeAddress(event: React.ChangeEvent<HTMLInputElement>) {
		setAddress(event.target.value);
	}

	function handleChangeAmount(event: React.ChangeEvent<HTMLInputElement>) {
		setAmount(Number(event.target.value));
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!connection || !publicKey) {
			toast.error("Please connect your wallet.");
			return;
		}

		try {
			setStatus("loading");
			const { blockhash, lastValidBlockHeight } =
				await connection.getLatestBlockhash();

			const txInfo = {
				feePayer: publicKey,
				blockhash: blockhash,
				lastValidBlockHeight: lastValidBlockHeight,
			};

			const transaction = new web3.Transaction(txInfo);
			const instruction = web3.SystemProgram.transfer({
				fromPubkey: publicKey,
				lamports: amount * web3.LAMPORTS_PER_SOL,
				toPubkey: new web3.PublicKey(address),
			});

			transaction.add(instruction);
			const signature = await sendTransaction(transaction, connection);

			setSignature(signature);
			setStatus("success");
		} catch (error) {
			console.log(error);
			toast.error("Transaction failed!");
			setStatus("error");
		}
	}

	return (
		<main className="container py-12 mx-auto text-zinc-50">
			<h1 className="text-4xl font-bold">Send SOL Starter</h1>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-12">
				<label htmlFor="address">Address</label>
				<input
					type="text"
					id="address"
					maxLength={44}
					value={address}
					onChange={handleChangeAddress}
					className="p-2 rounded-md text-zinc-50 bg-zinc-800"
				/>

				<label htmlFor="amount">Amount</label>
				<input
					type="number"
					id="amount"
					value={amount}
					onChange={handleChangeAmount}
					className="p-2 rounded-md text-zinc-50 bg-zinc-800"
				/>

				<button
					type="submit"
					className="p-2 text-white bg-blue-500 rounded-md"
					disabled={status === "loading"}
				>
					{status === "loading" ? "Sending..." : "Send"}
				</button>
			</form>

			<div>
				{status === "success" ? (
					<p>Transaction successful! Signature: {signature}</p>
				) : null}
			</div>
		</main>
	);
}
