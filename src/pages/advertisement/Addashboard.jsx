import React from 'react'
import Homenav from '../../components/Homenav';
import Adnav from '../../components/Adnav';

function Addashboard() {
  return (
	<div className='w-full dark:bg-dark_bg bg-light_bg dark:text-grey_dark text-grey_light  min-h-screen overflow-x-clip'>
		<Homenav/>
		<Adnav/>
		
		{/* list for the running ads etc*/}
		<div className='w-full min-h-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 my-10 mx-4 md:place-items-center overflow-x-chidden'>
			<div className='w-[250px] h-[200px] bg-light_overlay dark:bg-dark_overlay rounded flex flex-col items-center justify-center'>
				<span className='text-[40px] font-bold ' >0</span>
				<h3 className='text-xl font-bold text-primary'>Active</h3>
				<p className='text-[12px] w-[80%] mx-4 my-2'>this are the list of your ads currently running</p>
			</div>
			<div className='w-[250px] h-[200px] bg-light_overlay dark:bg-dark_overlay rounded flex flex-col items-center justify-center'>
				<span className='text-[40px] font-bold '>0</span>
				<h3 className='text-xl font-bold text-primary'>expired</h3>
				<p className='text-[12px] w-[80%] mx-4 my-2'>your expired ads, you can  renew them</p>
			</div>
			<div className='w-[250px] h-[200px] bg-light_overlay dark:bg-dark_overlay rounded flex flex-col items-center justify-center'>
				<h3 className='text-xl font-bold text-primary'>actions</h3>
				<button className='border  my-2 border-b-grey_light dark:border-grey_dark w-[100px] h-[30px] hover:bg-primary hover:border-none rounded '>create</button>
				<button className='border  my-2 border-b-grey_light dark:border-grey_dark w-[100px] h-[30px] hover:bg-primary hover:border-none rounded '>update/edit</button>
				<button className='border  my-2 border-b-grey_light dark:border-grey_dark w-[100px] h-[30px] hover:bg-primary hover:border-none rounded '>terminate</button>
			</div>
		</div>
				
	</div>
  )
}

export default Addashboard