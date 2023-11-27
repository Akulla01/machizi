import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleDollarToSlot, faMoneyBillTransfer, faPaperPlane, faSackDollar } from '@fortawesome/free-solid-svg-icons';

function Actions() {
  return (
	<div className='w-[200px]  min-h-[100px] pb-4 gap-10 absolute top-0 shadow-md left-4 flex items-center flex-col'>
	 <div className='w-full bg-gradient-to-r from-primary text-center pt-1 rounded-tl-md  rounded-tr-md to-accent h-[35px] text-grey_dark'>actions</div>
	 <ul className='flex flex-col gap-4 font-bold'>
		<li className='hover:text-primary cursor-pointer text-md'><a href="#"><FontAwesomeIcon icon={faMoneyBillTransfer} />&nbsp;transactions</a></li>
		<li className='hover:text-primary cursor-pointer text-md'><a href="#"><FontAwesomeIcon icon={faSackDollar} />&nbsp;</a>deposit money</li>
		<li className='hover:text-primary cursor-pointer text-md'><a href="#"><FontAwesomeIcon icon={faCircleDollarToSlot} />&nbsp; withdraw money</a></li>
		<li className='hover:text-primary cursor-pointer text-md'><a href="#"><FontAwesomeIcon icon={faPaperPlane} />&nbsp; send cash</a></li>
	 </ul>
	</div>
  )
}

export default Actions