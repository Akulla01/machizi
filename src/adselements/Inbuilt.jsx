import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd } from '@fortawesome/free-solid-svg-icons';

function Inbuilt() {
  return (
	<div className='w-full h-[200px] bg-grey_light dark:bg-grey_dark my-4 sm:w-[90%] sm:p-2 sm:mx-[5%] md:w-[70%] md:mx-[10%] min-h-[100px]  mb-0'>
		<div className='bg-transparent w-full h-full flex items-center justify-center flex-col gap-2'>
			<FontAwesomeIcon className='text-2xl' icon={faAd}/>
			<span>buy this space <a className='underline' href="#">learn more</a></span>
		</div>
		
	</div>
  )
}

export default Inbuilt