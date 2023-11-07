import React, { useEffect, useState } from 'react'
import Homenav from '../../components/Homenav';
import Adnav from '../../components/Adnav';
import Adrequest from '../../modules/ad_request';
import Action from '../../adselements/Action';
import Publish from '../../adselements/Publish';
import Basic_silver from '../../adselements/Basic_silver';
import Platinum_gold from '../../adselements/Platinum_gold';

function Addashboard() {
	const [ad_data,setad_data] = useState([]);
	const [update,setUpdate] = useState(false);
	const [create,setCreate] = useState(false);
	const adrequest = new Adrequest();
	useEffect(()=>{
		adrequest.get_ads_tk("active-expired-ad",setad_data);
	},[]);
	
	
  return (
	<div className='w-full dark:bg-dark_bg bg-light_bg dark:text-grey_dark text-grey_light  min-h-screen overflow-x-clip'>
		<div className='h-[80px] w-full relative'>
			<Homenav/>
		</div>
		
		<Adnav 
		update={update}
		 setUpdate={setUpdate} 
		 create={create} 
		 setCreate={setCreate}
		 />
		{
			update && (
				<Action data={ad_data?ad_data.data:null}/>
			)
		}
		
		{
			create && (
				<Publish/>
			)
		}
		
		{/* list for the running ads etc*/}
		
		{
			!update  && !create && (
				<div className='w-full min-h-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 my-10 mx-4 md:place-items-center overflow-x-chidden'>
		<div className='w-[90%] sm:w-[250px] h-[200px] bg-light_overlay dark:bg-dark_overlay rounded flex flex-col items-center justify-center'>
				<span className='text-[40px] font-bold ' >{!(ad_data?.total_active+ad_data?.total_expired)? 0 : ad_data?.total_active+ad_data?.total_expired}</span>
				<h3 className='text-xl font-bold text-primary'>total</h3>
				<p className='text-[12px] w-[50%] sm:w-[80%] mx-4 my-2'>count of all your ads that are in our inventory</p>
			</div>
			<div className='w-[90%] sm:w-[250px] h-[200px] bg-light_overlay dark:bg-dark_overlay rounded flex flex-col items-center justify-center'>
				<span className='text-[40px] font-bold ' >{ad_data?.total_active}</span>
				<h3 className='text-xl font-bold text-primary'>Active</h3>
				<p className='text-[12px] w-[50%] sm:w-[80%] mx-4 my-2'>this are the list of your ads currently running</p>
			</div>
			<div className='w-[90%] sm:w-[250px] h-[200px] bg-light_overlay dark:bg-dark_overlay rounded flex flex-col items-center justify-center'>
				<span className='text-[40px] font-bold '>{ad_data?.total_expired}</span>
				<h3 className='text-xl font-bold text-primary'>expired</h3>
				<p className='text-[12px] w-[50%] sm:w-[80%] mx-4 my-2'>your expired ads, you can  renew them</p>
			</div>
			<div className='w-[90%] sm:w-[250px] h-[200px] bg-light_overlay dark:bg-dark_overlay rounded flex flex-col items-center justify-center'>
				<h3 className='text-xl font-bold text-primary'>actions</h3>
				<button 
				onClick={()=>setCreate(!create)}
				className='border  my-2 border-b-grey_light dark:border-grey_dark w-[100px] h-[30px] hover:bg-primary hover:border-none rounded '>create/publish</button>
				<button
				onClick={()=>setUpdate(!update)}
				 className='border  my-2 border-b-grey_light dark:border-grey_dark w-[100px] h-[30px] hover:bg-primary hover:border-none rounded '>update/edit</button>
			</div>
		</div>
			)
		}
		
		<br />
		<div className='my-10 sm:w-[90%] min-h-0 shadow-md p-2 sm:mx-10' id='pricing'>
			<center>
			<h1 className='text-3xl my-10 font-bold'>pricing and plans</h1>	
			{/* basic and silver component */}
			<h3 className='my-10 font-bold'>tier 1 - for daily advertisement</h3>
			<Basic_silver/>
			<br />
			<h3 className='my-10 font-bold'>tier 2 - for monthly advertisement</h3>
			<Platinum_gold/>
			</center>
			
			
		</div>
				
	</div>
  )
}

export default Addashboard