import React, { useEffect } from 'react'

function Transactiontable({transactions,setcurrent_page}) {
	
	useEffect(()=>{
		console.log(transactions);
	},[transactions]);
	
	
	
  return (
	<div className='w-full overflow-x-scroll xl:overflow-hidden'>
		{/* when there are no transactions */}
		{transactions?.length == 0 && (
			<div>
			<h3 className='text-2xl font-bold m-4'>no transactions yet <button 
				className='w-[100px] h-[40px] bg-primary rounded-md mx-4 text-sm'
				 onClick={()=>setcurrent_page(prev =>({
				prev:false,
				home_page:true
			}))}
			>back</button></h3>
			</div>
		)}
		
		
		
		
		
		{transactions?.length > 0 && (
			<>
				<h3 className='text-2xl font-bold m-4'>
					Your transactions
				<button 
				className='w-[100px] h-[40px] bg-primary rounded-md mx-4 text-sm'
				 onClick={()=>setcurrent_page(prev =>({
				prev:false,
				home_page:true
			}))}
			>back</button></h3>
				
				<div>
					<table className='my-10 text-center sm:mx-10'>
						<thead>
							<tr>
							<th className='mx-4 text-center font-bold border p-2'>transaction id</th>
              <th className='mx-4 text-center font-bold border p-2'>transaction type</th>
							<th className='mx-4 text-center font-bold border p-2'>transaction owner</th>
							<th className='mx-4 text-center font-bold border p-2'>transaction amount</th>
							<th className='mx-4 text-center font-bold border p-2'>transaction date</th>						
							</tr>

						</thead>
						<tbody>
							{
								transactions?.map(each_transaction =>(
									<tr>
                    {
                      each_transaction?.transaction_type >=0 && (
                        <>
										<td className='mx-4 text-center border p-2'>{each_transaction?.transaction_id}</td>
                    <td className='mx-4 text-center border p-2'>{each_transaction?.transaction_type ===0 ?"Deposit" :"Withdrawal"}</td>
										<td className='mx-4 text-center border p-2'>{each_transaction?.partyB}</td>
										<td className='mx-4 text-center border p-2'>{each_transaction?.amount_transacted}</td>
										<td className='mx-4 text-center border p-2'>{each_transaction?.created_at}</td> 
                     </>                       
                      )
                    }

									</tr>							
								))
							}

						</tbody>
					</table>
				</div>			
			</>
		)}

	</div>
  )
}

export default Transactiontable