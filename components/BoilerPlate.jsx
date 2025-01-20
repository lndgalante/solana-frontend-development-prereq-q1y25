const BoilerPlate = () => {
	return (
		<main className="bg-[#161b19] min-h-screen text-white">
			<div className="flex items-center justify-center w-full h-screen">
				<div className="flex flex-col items-center p-10 text-center border-2 rounded-lg bg-zinc-800 border-zinc-600">
					<h1 className="text-4xl italic">your turn to build!</h1>
					<a
						href="/"
						className="w-1/2 py-2 mt-8 font-medium transition-all duration-200 border-2 border-transparent rounded-lg bg-turbine-green hover:border-turbine-green hover:bg-transparent"
					>
						return home
					</a>
				</div>
			</div>
		</main>
	);
};

export default BoilerPlate;
