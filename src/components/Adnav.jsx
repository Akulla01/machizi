import React from 'react'

function Adnav({update,setUpdate,create,setCreate}) {
  return (
	<div className='w-full h-[20px]'>
		<ul className="flex items-center md:justify-center gap-4 md:text-md">
			<li className='ml-4 cursor-pointer hover:text-primary'>pricing</li>
			<li className='cursor-pointer hover:text-primary' onClick={()=>setCreate(!create)}>publish</li>
			<li className='cursor-pointer hover:text-primary' 
			onClick={()=>setUpdate(!update)}
			>update</li>
		</ul>
	</div>
  )
}

export default Adnav