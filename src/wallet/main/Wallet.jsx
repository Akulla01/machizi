import React from 'react'
import Walletnav from '../components/Walletnav'
import Balance from '../components/Balance'
import Actions from '../components/Actions'
import Statistics from '../components/Statistics'

function Wallet() {
  return (
	<div className='w-full min-h-screen bg-light_bg dark:bg-dark_bg text-grey_light dark:text-grey_dark font-roboto'>
		<Walletnav/>
		
		{/* user account balance */}
		<div className='w-full my-10 relative'>
		<Balance/>	
		<Actions/>
		</div>
		
		{/*accounts statistics*/}
		<div>
		<Statistics/>
		</div>
		
	</div>
  )
}

export default Wallet