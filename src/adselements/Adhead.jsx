import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logo_with_bg.png";

function Adhead({adData}) {
	const time = "advertisement";
	const [details,setDetails] = useState({});
	useEffect(()=>{
		setDetails(adData);
	},[adData]);
  return (
	<div className='w-full font-roboto dark:text-grey_dark px-1 sm:mx-10 relative'>
		<div className='w-full flex items-center gap-2  mb-4 cursor-pointer'>
			<img src={details?.profile} className='w-[40px] h-[40px] rounded-[100vh] bg-grey_light object-cover' alt="" />
			<h3 >
				<span className='text-xl text-grey_light font-bold font-roboto flex flex-col dark:text-primary'>{details?.name}</span>
				<span className='text-[12px] text-grey_light  dark:text-grey_dark'>{time}</span>
			</h3>
		</div>
		
		<div className='w-full min-h-[20px] font-bold text-sm mb-4'>
			<p className='w-[90%] mx-4'>{details?.ad_heading}</p>
		</div>
		<span className=' absolute right-10 text-grey_light dark:text-grey_dark top-0 text-2xl'><FontAwesomeIcon icon={faAd}/></span>
	</div>
  )
}

export default Adhead