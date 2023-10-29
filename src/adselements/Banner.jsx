import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd } from '@fortawesome/free-solid-svg-icons';
import Adrequest from '../modules/ad_request';

function Banner({isGlobal}) {
	const ad_request = new Adrequest();
	const [banner_home,setbanner_home] = useState([]);
	const [banner_counter,setbanner_counter] = useState(0);
	const [current_banner,setcurrent_banner] = useState([]);
	
	
	useEffect(()=>{
		var banner_slider = setInterval(()=>{
		  var random_number = Math.ceil(Math.random()*banner_home?.length);
		  if(banner_home?.length-1 >= 1){
			setbanner_counter(random_number);
		  }
		},6000);
		return () =>clearInterval(banner_slider);
	  },[banner_home]);
	
	  useEffect(()=>{
		setcurrent_banner(banner_home[banner_counter]);
	  },[banner_counter]);
	  
	  
	  useEffect(()=>{
		if(isGlobal){
			ad_request.get_ads("global-banner",setbanner_home);
			console.log("global");
		}else{
			ad_request.get_ads("home-banner",setbanner_home);
			console.log("home");
		}
		
	  },[]);
	  
	  
  return (
	<div className='w-full h-[200px] bg-grey_light dark:bg-grey_dark relative flex items-center justify-center cursor-pointer'>
		{
			current_banner ? (
			<div className='bg-transparent w-full h-full flex items-center justify-center flex-col gap-2' onClick={()=>window.open(current_banner.link)}>
				<img src={current_banner.ad_media} className=' w-full h-full object-cover'/>
				<h2 className='absolute text-xl text-grey_light font-bold  p-[2px]'>{current_banner.ad_heading}</h2>
				</div>	
			)
			:
			(
			<div className='bg-transparent w-full h-full flex items-center justify-center flex-col gap-2'>
			<FontAwesomeIcon className='text-2xl' icon={faAd}/>
			<span>buy this space <a className='underline' href="#">learn more</a></span>
			</div>	
			)
		}

	</div>
  )
}

export default Banner