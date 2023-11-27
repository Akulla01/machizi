import React from 'react'

function Statistics() {
  return (
	<div className='w-[90%] h-[300px] shadow-md bg-dark_overlay mx-[2%] rounded-md pt-2'>
		<center><h3 className='my-4 text-md'>Your account statistics</h3></center>
		<div  className='w-full  flex  my-[4rem] mb-4 gap-10 items-center justify-center'>
		{/* total deposits */}
		<div className='border p-2 rounded-md border-grey_dark'>
			<div>
				<div className='text-xl font-bold'>0</div>
				<div>
					<span>total deposits</span>
				</div>
			</div>
		</div>
		
		{/* total withdrawals */}
		<div className='border p-2 rounded-md border-grey_dark'>
			<div>
				<div className='text-xl font-bold'>0</div>
				<div>
					<span>total withdrawals</span>
				</div>
			</div>
		</div>
		{/* total transactions*/}
		<div className='border p-2 rounded-md border-grey_dark'>
			<div>
				<div className='text-xl font-bold'>0</div>
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