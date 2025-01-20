import { CodeIcon } from "@heroicons/react/outline";

const ProjectCard = ({
	project,
	displayRequirements,
	setDisplayRequirements,
	index,
}) => (
	<div className="relative rounded-lg bg-turbine-green cols-span-1">
		<div
			key={project.id}
			className="flex flex-col justify-between p-5 font-mono text-sm transition-all duration-200 rounded-lg h-60 bg-zinc-800 hover:translate-x-1 hover:translate-y-1"
		>
			<div className="flex justify-between text-xl">
				<div>
					<h2 className="font-extrabold text-turbine-green">
						{index < 10 ? `0${index + 1}` : index + 1}
					</h2>
				</div>
				<span className="font-light tracking-wide">{project.title}</span>
			</div>
			<p>{project.description}</p>
			<div className="flex justify-between mt-8 font-semibold">
				<div>
					<a
						href={project.href.finished}
						className="px-4 py-1 text-black transition-all duration-200 border-2 border-transparent rounded-full bg-zinc-300 hover:border-zinc-300 hover:bg-transparent hover:text-white"
					>
						preview
					</a>
					<a
						href={project.href.starter}
						className="px-4 py-1 ml-4 transition-all duration-200 border-2 border-transparent rounded-full bg-turbine-green hover:border-turbine-green hover:bg-transparent"
					>
						starter
					</a>
				</div>
				<div className="block sm:hidden lg:block">
					<button
						className="flex items-center tracking-wide transition-all duration-200 hover:text-turbine-green"
						onClick={() => setDisplayRequirements(!displayRequirements)}
					>
						requirements
						<CodeIcon width="25px" className="pl-1" />
					</button>
				</div>
			</div>
		</div>
	</div>
);

export default ProjectCard;
