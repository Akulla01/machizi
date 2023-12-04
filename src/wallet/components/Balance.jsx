import React, { useEffect, useState } from 'react'
import Walletrequest from "../modules/request.js";
import Bubbleloader from '../../loaders/Bubbleloader.jsx';

function Balance({setBallance,ballance}) {
	const wallet_request = new Walletrequest();
	
	
	useEffect(() => {
		wallet_request.wallet_query("get-ballance",null,setBallance);
	}, [])
	
  return (
	<div className='sm:w-[50%] sm:mx-[25%] h-[300px] shadow-xl flex items-center flex-col justify-center rounded-md'>
		{!ballance?<Bubbleloader/>:
		<>
		<h1 className='text-[40px] sm:text-[100px] font-bold'>KSH. &nbsp;{wallet_request.trim_ballance(ballance)}</h1>
		<span className='my-4 text-primary text-md font-bold'>Your Account Balance</span>
		</>
		}
		
	</div>
  )
}

export default Balance