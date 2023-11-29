import React, { useState } from 'react'
import Walletrequest from "../modules/request.js";



function Withdraw({setBallance}) {
	const wallet_request = new Walletrequest();
	const [withdraw,setWithdraw] = useState({
		withdraw_amount:10
	});
	
	
	/* handle withdraw function */
	const handleWithdraw = () =>{
			wallet_request.wallet_query("withdraw-money",withdraw,setBallance);
	}
	
	
	
  return (
	<div className='w-[90%] min-h-[100px] shadow-md mx-[2%] my-4 rounded-md pt-2'>
	<center><h3 className='my-4 text-md'>withdraw money</h3></center>
	<div className=' my-2 p-2 rounded-md flex items-center justify-center'>
		<input 
		onChange={(e)=>setWithdraw(prev => ({
			withdraw_amount:e.target.value
		}))}
		type="number" 
		className='w-[200px] h-[40px] dark:bg-dark_overlay dark:text-grey_dark rounded-tl-md rounded-bl-md'
		 placeholder='   minimum 10/='
		  min={10} />
		<button onClick={handleWithdraw} className='w-[150px] h-[40px] bg-primary text-grey_dark rounded-tr-md rounded-br-md'>withdraw</button>
	</div>
</div>
  )
}

export default Withdraw