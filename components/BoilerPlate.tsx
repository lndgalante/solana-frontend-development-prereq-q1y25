// internals
import type { Status } from "../lib/types";

// types
type Props = {
	status: Status;
	balance: number;
};

export function BoilerPlate({ status, balance }: Props) {
	return (
		<main className="container py-12 mx-auto text-zinc-50">
			<h1 className="text-4xl font-bold">Wallet Starter</h1>

			{status === "idle" ? <p>Connect your wallet first.</p> : null}
			{status === "loading" ? <p>Loading...</p> : null}
			{status === "success" ? (
				<div>
					<p>Balance: ${balance} USD</p>
					<p>This balance represents the total value of your tokens in USD.</p>
				</div>
			) : null}
			{status === "error" ? <p>Something went wrong</p> : null}
		</main>
	);
}
