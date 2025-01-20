import React from "react";
import Requirements from "../components/Requirements";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../projects/projects";

const Index = () => {
	const [displayRequirements, setDisplayRequirements] = React.useState(false);

	return (
		<main className="min-h-screen p-4 text-white bg-black">
			<Requirements
				displayRequirements={displayRequirements}
				setDisplayRequirements={setDisplayRequirements}
			/>
			<section className="flex flex-col justify-center gap-y-4">
				<div className="flex flex-col items-center justify-center w-full col-span-2 p-5 font-mono text-sm text-center rounded-lg bg-zinc-800">
					<h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
						Turbin3 Frontend Course Prerequisites
					</h1>
					<div>
						by
						<a
							href="https://twitter.com/sturt_jack"
							rel="noreferrer"
							target="_blank"
							className="my-4 transition-colors duration-200 text-zinc-400 hover:text-turbine-green"
						>
							{" "}
							@sturt_jack
						</a>{" "}
						based on the work of
						<a
							href="https://twitter.com/_zebedee_"
							rel="noreferrer"
							target="_blank"
							className="my-4 transition-colors duration-200 text-zinc-400 hover:text-turbine-green"
						>
							{" "}
							@_zebedee_
						</a>
					</div>
					<p className="leading-6">
						Completing these two micro projects is required in order to attend
						the Turbin3 Frontend Course. Note: you will likely need to airdrop
						yourself some SOL to test your projects.
					</p>
					<a
						href="https://faucet.solana.com/"
						rel="noreferrer"
						target="_blank"
						className="my-4 transition-colors duration-200 text-zinc-400 hover:text-turbine-green"
					>
						{" "}
						SOL FAUCET
					</a>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-7xl">
					{projects.map((project, index) => (
						<ProjectCard
							key={index}
							index={index}
							project={project}
							displayRequirements={displayRequirements}
							setDisplayRequirements={setDisplayRequirements}
						/>
					))}
				</div>
			</section>
		</main>
	);
};

export default Index;
