import {faGlobe, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

function Offline() {
	const [hide,setHide] = useState(false);
	
	// hide after three seconds
	useEffect(()=>{
		setTimeout(() => {
			setHide(true);
		}, 3000);
	},[]);
  return (
	<div className={`w-[250px]
	${hide && 'hidden'}
	 h-[60px] bg-crimson text-light_bg fixed bottom-2 left-2 rounded-md shadow-md flex items-center justify-around`}>
		<FontAwesomeIcon icon={faGlobe}/>
		<span>offline</span>
		<FontAwesomeIcon className='cursor-pointer bg-overlay rounded-[100vh] p-2 w-[10px] h-[10px]' onClick={()=>setHide(true)} icon={faX}/>
	</div>
  )
}

export default Offline