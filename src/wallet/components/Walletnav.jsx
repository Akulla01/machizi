import React from 'react'

function Walletnav() {
  return (
	<div className=' scroll-smooth  w-full h-[80px] bg-primary text-grey_dark flex items-center justify-around'>	
	<div>
		<h3 className='font-bold text-2xl'>machizi wallet</h3>
	</div>
   <ul className='flex items-center gap-2 font-bold'>
	<li><a href="#deposit_withdraw">deposit</a></li>
	{/* <li><a href="#deposit_withdraw">withdraw</a></li> */}
	<li><a href="#">transactions</a></li>
	<li><a href="/">home</a></li>
   </ul>
	</div>
  )
}

export default Walletnav