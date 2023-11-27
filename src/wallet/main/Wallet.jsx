import React from 'react'
import Walletnav from '../components/Walletnav'
import Balance from '../components/Balance'
import Actions from '../components/Actions'
import Statistics from '../components/Statistics'
import Deposit from '../components/Deposit'
import Withdraw from '../components/Withdraw'

function Wallet() {
  return (
	<div className='w-full min-h-screen bg-light_bg dark:bg-dark_bg text-grey_light dark:text-grey_dark pb-10 font-roboto'>
		<Walletnav/>
		
		{/* user account balance */}
		<div className='w-full my-10 relative'>
		<Balance/>	
		<Actions/>
		</div>
		
		{/*accounts statistics*/}
		<div className='w-full my-10'>
		<Statistics/>
		</div>
		
		<div id='deposit_withdraw'>
			<Deposit/>
			<Withdraw/>
		</div>
		
	</div>
  )
}

export default Wallet