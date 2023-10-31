import React from 'react'

function Adnav() {
  return (
	<div className='w-full h-[20px]'>
		<ul className="flex items-center md:justify-center gap-4 md:text-md">
			<li className='ml-4 cursor-pointer hover:text-primary'>pricing</li>
			<li className='cursor-pointer hover:text-primary'>publish</li>
			<li className='cursor-pointer hover:text-primary'>delete</li>
			<li className='cursor-pointer hover:text-primary'>update</li>
		</ul>
	</div>
  )
}

export default Adnav