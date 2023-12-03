import React, { useEffect, useState } from 'react'

function Statistics({wallet,setStatistics,setcurrent_page}) {
	
	/* 
	=== PAGES INDEXES===
	-1 = close the current page and go back to the my-wallet page.the homepage for wallet
	0 = deposit page
	1=withdrawals page
	2=total transaction page
	=======================
	 */
	const handle_page_swipe = (current_page) =>{
		 if(current_page == -1){
			/* home page */
			setcurrent_page(prev =>({
				prev:false,
				home_page:true
			}));
		 }else if(current_page == 0){
			/* deposit page */
			setcurrent_page(prev =>({
				prev:false,
				deposit_page:true
			}));
			
		 }else if(current_page == 1){
			/* withdrawals page */
			setcurrent_page(prev =>({
				prev:false,
				withdrawals_page:true
			}));
			
		 }else if(current_page == 2){
			/* transaction page */
			setcurrent_page(prev =>({
				prev:false,
				transaction_page:true
			}));
		 }
	}
	
	
	
	const [page,setpage] = useState(-1);
	useEffect(()=>{
		handle_page_swipe(page);
	},[page]);
	
	
	
	
	
	
	const[walletcount,setWallletcount] = useState({
		deposits:0,
		withdrawals:0,
		total:0
	});
	
	
	
	
	useEffect(()=>{
		if(wallet?.success){
			var total = wallet?.total_deposit.length+wallet?.total_withdrawal.length;
			setWallletcount(prev =>({
				...prev,
				deposits:wallet?.total_deposit.length,
				withdrawals:wallet?.total_withdrawal.length,
				total:total
				
			}));
			// set deposit,withdrawals and transactions
			setStatistics(prev =>({
				...prev,
				deposits:wallet?.total_deposit,
				withdrawals:wallet?.total_withdrawal,
				transactions:[...wallet?.total_deposit,wallet?.total_withdrawal]
			}));
		}
	},[wallet]);
	
	
	
	
  return (
	<div className='w-[90%] h-[300px] shadow-md bg-dark_overlay mx-[2%] rounded-md pt-2'>
		<center><h3 className='my-4 text-md'>Your account statistics</h3></center>
		<div  className='w-full  flex  my-[4rem] mb-4 gap-10 items-center justify-center'>
		{/* total deposits */}
		<div className='border p-2 rounded-md border-grey_dark cursor-pointer' onClick={()=>setpage(0)} >
			<div>
				<div className='text-xl font-bold'>{walletcount.deposits}</div>
				<div>
					<span>total deposits</span>
				</div>
			</div>
		</div>
		
		{/* total withdrawals */}
		<div className='border p-2 rounded-md border-grey_dark cursor-pointer' onClick={()=>setpage(1)} >
			<div>
				<div className='text-xl font-bold'>{walletcount.withdrawals}</div>
				<div>
					<span>total withdrawals</span>
				</div>
			</div>
		</div>
		{/* total transactions*/}
		<div className='border p-2 rounded-md border-grey_dark cursor-pointer' onClick={()=>setpage(2)} >
			<div>
				<div className='text-xl font-bold'>{walletcount.total}</div>
				<div>
					<span>total transactions</span>
				</div>
			</div>
		</div>
	</div>
	</div>
  )
}

export default Statistics