import React, { useEffect, useState } from 'react'
import Walletnav from '../components/Walletnav'
import Balance from '../components/Balance'
import Statistics from '../components/Statistics'
import Deposit from '../components/Deposit'
import Withdraw from '../components/Withdraw';
import Walletrequest from '../modules/request'
import Deposittable from '../components/Deposittable'
import Withdrawalstable from '../components/Withdrawalstable'
import Transactiontable from '../components/Transactiontable'

function Wallet() {
	const [ballance,setBallance] = useState(0.0);
	const [wallet,setWallet] = useState([]);
	const wallet_request = new Walletrequest();
	
	
	
	
	/* this carries the deposits withdrawals and transaction so that it can be used to show user
	data on a table when he clicks deposits withdrawals etc */
	const[statistics,setStatistics] = useState({
		deposits:null,
		withdrawals:null,
		transactions:null
	});
	

	
	/* this is used to toggle the view of the user eg when he is on the user table etc */
	const [current_page,setcurrent_page] = useState({
		deposit_page:false,
		withdrawals_page:false,
		transaction_page:false,
		home_page:true
	});
	
	useEffect(()=>{
		wallet_request.transactions_query("get-transaction",setWallet);
	},[]);
	
  return (
	<div className='w-full min-h-screen bg-light_bg dark:bg-dark_bg text-grey_light dark:text-grey_dark pb-10 font-roboto'>
		<Walletnav/>
		
		{
			current_page.home_page && (
				<>
					
					
					{/* user account balance */}
					<div className='w-full my-10 relative'>
							<Balance setBallance={setBallance} ballance={ballance}/>
					</div>
					
					{/*accounts statistics*/}
					<div className='w-full my-10'>
					<Statistics wallet={wallet} setStatistics={setStatistics} setcurrent_page={setcurrent_page}/>
					</div>
					
					<div id='deposit_withdraw'>
						<Deposit setBallance={setBallance}/>
						{/* <Withdraw setBallance={setBallance}/> */}
					</div>				
				</>
			)
		}
         
		 
		 
		 {/* deposit page  */}
		 {
			current_page.deposit_page && (
				<>
				<Deposittable deposits={statistics.deposits} setcurrent_page={setcurrent_page}/>
				</>
			)
		 }
		 
		 
		 
		 
		{/* withdrawals page  */}
		{
			current_page.withdrawals_page && (
				<>
				<Withdrawalstable withdrawals={statistics.withdrawals} setcurrent_page={setcurrent_page}/>
				</>
			)
		 }
		 
		 
		 
		 		{/* transactions page  */}
		{
			current_page.transaction_page && (
				<>
				<Transactiontable transactions={statistics.transactions} setcurrent_page={setcurrent_page}/>
				</>
			)
		 }
		
	</div>
  )
}

export default Wallet;