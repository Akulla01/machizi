import React, { useEffect } from 'react'
import Loader from '../loaders/Loader'
import Basic from '../modules/basic';
import "../custom_styles/post_styles.css";

function Postheading({heading,profile,username,time,id}) {
	const basic = new Basic();
	
  return (
	<div className='w-full font-roboto dark:text-grey_dark px-1'>
		<div className='w-full flex items-center gap-2  mb-4 cursor-pointer' onClick={()=>basic.redirect_to_profile(username,id)}>
			{!profile?
			<Loader/>
			:
			<img src={profile} className='w-[40px] h-[40px] rounded-[100vh] bg-grey_light object-cover border-2 border-light_overlay' alt="" />
			}
			
			<h3 >
				<span className='text-xl text-grey_light font-bold font-roboto flex flex-col dark:text-primary'>{username}</span>
				<span className='text-[12px] text-grey_light  dark:text-grey_dark'>posted on:{time}</span>
			</h3>
		</div>
		<div className='w-[100%] min-h-[20px] font-bold text-sm mb-4'>
			<div className='w-full mx-4' id='post_description' dangerouslySetInnerHTML={{__html:heading}}></div>
		</div>
	</div>
  )
}

export default Postheading