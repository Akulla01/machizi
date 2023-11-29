import React, { useState } from 'react'
import Walletrequest from "../modules/request.js";

function Deposit({setBallance}) {
	const wallet_request = new Walletrequest();
	const [deposit,setDeposit] = useState({
		topup_amount:10,
	});
	
	/* handle user depositing code here eg send to the database  */
	const handleDeposit = () =>{
		wallet_request.wallet_query("deposit-money",deposit,setBallance);
	}
	
  return (
	<div className='w-[90%] min-h-[100px] shadow-md mx-[2%] my-4 rounded-md pt-2'>
		<center><h3 className='my-4 text-md'>deposit money</h3></center>
		<div className=' my-2 p-2 rounded-md flex items-center justify-center'>
			<input type="number" 
			onChange={(e)=>setDeposit(prev =>({
				topup_amount:e.target.value
			}))}
			className='w-[200px] h-[40px] dark:bg-dark_overlay dark:text-grey_dark rounded-tl-md rounded-bl-md' 
			placeholder='   minimum 10' min={10} />
			<button className='w-[150px] h-[40px] bg-primary text-grey_dark rounded-tr-md rounded-br-md' onClick={handleDeposit}>deposit</button>
		</div>
	</div>
  )
}

export default Deposit