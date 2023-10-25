import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd } from '@fortawesome/free-solid-svg-icons';

function Banner() {
  return (
	<div className='w-full h-[200px] bg-grey_light dark:bg-grey_dark'>
		<div className='bg-transparent w-full h-full flex items-center justify-center flex-col gap-2'>
			<FontAwesomeIcon className='text-2xl' icon={faAd}/>
			<span>buy this space <a className='underline' href="#">learn more</a></span>
		</div>
		
	</div>
  )
}

export default Banner