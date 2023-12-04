import React, { useEffect, useState } from 'react'
import Walletrequest from "../modules/request.js";
import { toast } from 'react-toastify';

function Deposit({setBallance}) {
	const wallet_request = new Walletrequest();
	const [stk_response,setstk_response] = useState(null);
	const [paymentdone,setpaymentdone] = useState(null);
	const[confirm,setConfirm] = useState(false);
	const [deposit,setDeposit] = useState({
		topup_amount:10,
		number:""
	});
	
	
	
	
	/* handle user confirmation for the initiated payment  */
	const handleConfirmPayment = () =>{
		var merchant_Id=localStorage.getItem("MerchantRequestID");
		var checkout_Id=localStorage.getItem("CheckoutRequestID");
		const payload ={
			merchant_Id:merchant_Id,
			checkout_Id:checkout_Id
		}
		toast.info("payment confirmation initiated successfully wait for reply");
		wallet_request.wallet_query("confirm-deposit",payload,setpaymentdone);
		setBallance(paymentdone);
	}
	
	
	/* if the deposit process is completyly done */
	useEffect(()=>{
		if(paymentdone !==null){
			setBallance(paymentdone);
			setConfirm(false);
			localStorage.removeItem("MerchantRequestID");
			localStorage.removeItem("CheckoutRequestID");
		}
	},[paymentdone]);
	
	
	
	/* check if the stk push has been successfull has been successfull */
	useEffect(()=>{
		if(stk_response !== null){
		console.log(stk_response);	
		// TODO: save client details to the local storage
		toast.info(stk_response.CustomerMessage);
		if(stk_response.errorMessage){
			toast.error(stk_response.errorMessage)
		}
		if(stk_response.ResponseCode == 0){
			setConfirm(true);
			localStorage.setItem("MerchantRequestID",stk_response.MerchantRequestID);
			localStorage.setItem("CheckoutRequestID",stk_response.CheckoutRequestID);
		}	
		}

	},[stk_response]);
	
	
	
	
	// initiate the deposit of money
	const initiateDeposit = (e) =>{
		e.preventDefault();
		wallet_request.stk_response("stk-push",deposit,setstk_response);
		setDeposit(prev=>({
			topup_amount:10,
			number:""
		}));
	}
	
	
	
	
  return (
	<div className='w-[90%] min-h-[100px] shadow-md mx-[2%] my-4 rounded-md pt-2'>
		<center><h3 className='my-4 text-[30px] font-bold'>deposit money</h3></center>
		
		{
			confirm && (
				<div className='my-10'>
					<center>
						<span className='sm:w-[80%] mx-[10%]'>after you receive your payment confirmation message from mpesa
						you will come and click the button to complete payment on our side</span>
						<button className='w-[300px] h-[40px] bg-primary text-grey_dark my-4 rounded animate-bounce shadow-xl  shadow-primary' onClick={handleConfirmPayment}>confirm payment</button>
						</center>
	
				</div>
			)
		}
		{
			!confirm && (
				<div className=' my-2 p-2 rounded-md flex flex-col gap-4 items-center justify-center'>
						<label htmlFor="amount" className='mt-4 text-sm'>enter amount to be deposited min:10/=</label>
							<input id='amount' type="number" 
							onChange={(e)=>setDeposit(prev =>({
								...prev,
								topup_amount:e.target.value
							}))}
							className='sm:w-[300px] border rounded p-2 w-[90%] h-[40px] dark:bg-dark_overlay dark:text-grey_dark' 
							value={deposit.topup_amount}
							placeholder='   minimum 10' min={10} />
							
							
							
							{/* phone number */}
							<label htmlFor="phone" className='mt-4 text-sm'>enter phone number  in 2547*** formart without (+)</label>
							<input id='phone' type="text" 
							onChange={(e)=>setDeposit(prev =>({
								...prev,
								number:Number(e.target.value)
							}))}
							className='sm:w-[300px] border rounded p-2 w-[90%] h-[40px] dark:bg-dark_overlay dark:text-grey_dark rounded-tl-md rounded-bl-md'
							value={deposit.phone_number} 
							placeholder='  example: 254745000000 ' />
							
							<button className='sm:w-[300px] border p-2 w-[90%] h-[40px] bg-primary text-grey_dark my-4 rounded' onClick={initiateDeposit}>deposit</button>
						</div>				
			)
		}
		
	</div>
  )
}

export default Deposit