"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, web3, type Wallet } from "@coral-xyz/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import type { Connection } from "@solana/web3.js";

// internals
import { Program } from "@coral-xyz/anchor";

// internals
import type { Status } from "../lib/types";
import CounterIDL from "../programs/idls/counter.json";
import type { Counter } from "../programs/types/counter";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

// helpers
async function getPreparedTransaction(
	connection: Connection,
	publicKey: PublicKey,
) {
	const { blockhash, lastValidBlockHeight } =
		await connection.getLatestBlockhash();

	const txInfo = {
		feePayer: publicKey,
		blockhash: blockhash,
		lastValidBlockHeight: lastValidBlockHeight,
	};

	const transaction = new web3.Transaction(txInfo);

	return transaction;
}

export function CounterPage() {
	// react hooks
	const [initializeSignature, setInitializeSignature] = useState("");
	const [incrementSignature, setIncrementSignature] = useState("");

	const [counterKey, setCounterKey] = useState("");
	const [countValue, setCountValue] = useState(0);
	console.log("\n ~ CounterPage ~ countValue:", countValue);

	const [initializeStatus, setInitializeStatus] = useState<Status>("idle");
	const [incrementStatus, setIncrementStatus] = useState<Status>("idle");

	// solana hooks
	const { connection } = useConnection();
	const { publicKey, wallet } = useWallet();

	// constants
	const provider = new AnchorProvider(
		connection,
		wallet?.adapter as unknown as Wallet,
		AnchorProvider.defaultOptions(),
	);

	const counterProgram = new Program(
		CounterIDL as unknown as Counter,
		provider,
	);

	// effects
	useEffect(
		function getCountValue() {
			const getInfo = async () => {
				if (connection && publicKey && counterKey && incrementSignature) {
					try {
						const currentCount = await counterProgram.account.counter.fetch(
							new PublicKey(counterKey),
						);
						setCountValue(currentCount.count);
					} catch (error) {
						console.log(error);
					}
				}
			};
			getInfo();
		},
		[connection, publicKey, counterKey, incrementSignature],
	);

	// handlers
	async function handleInitializeCounter() {
		if (!connection || !publicKey) {
			toast.error("Please connect your wallet.");
			return;
		}

		setInitializeStatus("loading");

		const transaction = await getPreparedTransaction(connection, publicKey);
		const counterKeypair = Keypair.generate();

		const instruction = await counterProgram.methods
			.initialize()
			.accounts({
				payer: publicKey,
				counter: counterKeypair.publicKey,
			})
			.instruction();
		transaction.add(instruction);

		try {
			const signature = await provider.sendAndConfirm(
				transaction,
				[counterKeypair],
				{ skipPreflight: true },
			);

			setInitializeSignature(signature);
			setCounterKey(counterKeypair.publicKey.toBase58());

			setInitializeStatus("success");
		} catch (error) {
			console.log(error);
			setInitializeStatus("error");
			toast.error("Transaction failed!");
		}
	}

	async function handleIncrementCounter() {
		if (!connection || !publicKey) {
			toast.error("Please connect your wallet.");
			return;
		}

		setIncrementStatus("loading");
		const transaction = await getPreparedTransaction(connection, publicKey);
		const instruction = await counterProgram.methods
			.increment()
			.accounts({
				counter: new PublicKey(counterKey),
			})
			.instruction();
		transaction.add(instruction);

		try {
			const signature = await provider.sendAndConfirm(transaction, [], {
				skipPreflight: true,
			});
			setIncrementSignature(signature);
			setIncrementStatus("success");
		} catch (error) {
			console.log(error);
			setIncrementStatus("error");
			toast.error("Transaction failed!");
		}
	}

	return (
		<main className="container flex flex-col gap-4 py-12 mx-auto text-zinc-50">
			<h1 className="text-4xl font-bold">Counter Starter</h1>

			<button
				type="button"
				className="p-2 text-white bg-blue-500 rounded-md disabled:opacity-50"
				onClick={handleInitializeCounter}
				disabled={initializeStatus === "loading"}
			>
				{initializeStatus === "loading"
					? "Initializing..."
					: "Initialize Counter"}
			</button>

			<button
				type="button"
				className="p-2 text-white bg-blue-500 rounded-md disabled:opacity-50"
				onClick={handleIncrementCounter}
				disabled={incrementStatus === "loading" || !counterKey}
			>
				{incrementStatus === "loading"
					? "Incrementing..."
					: "Increment Counter"}
			</button>

			<div>
				{initializeStatus === "success" && initializeSignature ? (
					<p>
						Transaction successful! Initialize Signature: {initializeSignature}
					</p>
				) : null}
			</div>

			<div>
				{incrementStatus === "success" && incrementSignature ? (
					<p>
						Transaction successful! Increment Signature: {incrementSignature}
					</p>
				) : null}
			</div>

			<p>Current Count: {countValue}</p>
			{initializeStatus === "success" ? <p>Counter Key: {counterKey}</p> : null}
		</main>
	);
}
