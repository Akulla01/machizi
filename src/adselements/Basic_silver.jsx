
function Basic_silver(){
	return(
		<div className="w-full sm:w-[80%] flex items-center justify-center flex-col md:flex-row">
		<div className="w-[90%] sm:w-[300px] min-h-[400px] my-4 mx-4 shadow bg-basic rounded-md p-2 text-grey_light">
			<h1 className="font-bold text-xl sm:text-4xl my-4 text-accent">basic</h1>
			<span className="mt-10 font-bold">banner advertisement</span>
			<div className="text-[50px] font-extrabold text-grey_dark">
				ksh.150
			</div>
			<span className="mt-10 font-bold">inbult advertisement</span>
			<div className="text-[50px] font-extrabold text-grey_dark">
				ksh.300
			</div>
			<span className="text-[12px]">shown on the homepage only</span>
			<br />
			<a href="#" className="text-[10px] underline">learn more</a>
		</div>
		<div className="w-[90%] sm:w-[300px] min-h-[400px] my-4 mx-4 shadow bg-silver text-grey_dark">
			<h1 className="font-bold rounded my-4 text-primary text-xl sm:text-4xl">Silver</h1>
			<span  className="mt-10 font-bold">banner advertisement</span>
			<div className="text-[50px] font-extrabold text-grey_dark">
				ksh.500
			</div>
			<span  className="mt-10 font-bold">inbult advertisement</span>
			<div className="text-[50px] font-extrabold text-grey_dark">
				ksh.700
			</div>
			<span className="text-[12px]">shown everywhere on the website</span>
			<br />
			<a href="#" className="text-[10px] underline">learn more</a>
		</div>
		</div>
	)
}

export default Basic_silver;