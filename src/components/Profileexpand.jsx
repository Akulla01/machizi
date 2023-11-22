import { faHouse, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Basic from '../modules/basic'

function Profileexpand({user,close}) {
	const basic = new Basic();
  return (
	<div className='w-full h-screen bg-overlays flex items-center justify-center flex-col dark:bg-dark_overlay'>
		<div className=' w-full sm:w-[400px] h-[400px]'>
			<img src={user?.profile} className='w-full h-full object-cover' />
		</div>
		
		<div className='flex flex-col gap-4 my-4 dark:text-grey_dark'>
			<span className='font-bold'>{user?.name}</span>
			<span className='text-sm font-bold'>{user?.bio}</span>
			<span>{user?.followers}&nbsp; followers</span>
		</div>
		
		<div className='w-[90%] p-4 sm:w-[300px] h-[60px] rounded-2xl shadow-md my-4 flex items-center justify-center gap-4'>
			<button className='bg-primary text-grey_dark w-[100px] h-[40px] rounded-lg' onClick={()=>close(false)}><FontAwesomeIcon icon={faX}/>&nbsp;close</button>
			<button className='bg-dark_bg text-grey_dark w-[100px] h-[40px] rounded-lg' onClick={()=>basic.home()}><FontAwesomeIcon icon={faHouse}/>&nbsp;home</button>
		</div>
	</div>
  )
}

export default Profileexpand