import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd } from '@fortawesome/free-solid-svg-icons';
import Adhead from './Adhead';
import Adrequest from '../modules/ad_request';

function Inbuilt({isGlobal}) {
	const ad_request = new Adrequest();
	const[inbuilt,setInbuilt] = useState([]);
	const[randinbuilt,setRandinbuilt] = useState([]);
	
	// fetch from the database according to the 
	// location where the ad will be placed.
	useEffect(()=>{
		if(isGlobal){
			ad_request.get_ads("global-inbuilt",setInbuilt);
		}else{
			ad_request.get_ads("home-inbuilt",setInbuilt);	
		}
	},[isGlobal]);
	
	// generate a random number to be used to select the advertisement 
	// from the array of post
	function random_post(){
		return Math.ceil(Math.random()*(inbuilt?.length));
	}
	
	// set the random advertisement  ready to be displayed to the user
	useEffect(()=>{
		var time_five_seconds = setInterval(() => {
			setRandinbuilt(inbuilt[random_post()]);
		}, 5000);
		return () => clearInterval(time_five_seconds);
	},[inbuilt]);
	

	


  return (
	<div className='w-full h-[400px] my-10 sm:w-[90%] sm:p-2 sm:mx-[5%] md:w-[70%] md:mx-[10%] min-h-[100px]  mb-0 cursor-pointer'
	onClick={()=>window.open(randinbuilt?.link)}
	>
		
		{
			!randinbuilt && (
				<>
				<Adhead/>
				<div className='w-full h-[300px] bg-grey_light dark:bg-grey_dark my-4 sm:w-[90%] sm:p-2 sm:mx-[5%] md:w-[70%] md:mx-[10%] min-h-[100px]  mb-0'>
				<div className='bg-transparent w-full h-full flex items-center justify-center flex-col gap-2'>
				<FontAwesomeIcon className='text-2xl' icon={faAd}/>
				<span>buy this space <a className='underline' href="#">learn more</a></span>
				</div>

				</div>
				</>
			)
		}
		{
			randinbuilt && (
				<>
				<Adhead adData ={randinbuilt}/>
				<div className='w-full h-[300px] bg-grey_light dark:bg-grey_dark my-4 sm:w-[90%] sm:p-2 sm:mx-[5%] md:w-[70%] md:mx-[10%] min-h-[100px]  mb-0'>
				<img src={randinbuilt?.ad_media} className='bg-transparent w-full h-full flex items-center justify-center flex-col gap-2 object-cover'/>
				</div>
				</>
			)
		}
	
	</div>
  )
}

export default Inbuilt