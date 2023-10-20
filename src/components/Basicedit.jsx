import React, { useState } from 'react'
import User from '../modules/user_db';
import Validator from '../modules/validator';
function Basicedit({name,phone,status}) {
	var user_request = new User();
	var validator = new Validator();
	const [userdata,setUserdata] = useState({
		name:name,
		phone:phone,
		status:status,
	})

	
	
	const handlesignIn =()=>{
		var form_data = new FormData();
		form_data.append('name',userdata.name);
		form_data.append('phone',userdata.phone);
		form_data.append('status',userdata.status);
		user_request.edit_user('/basic-profile-edit',form_data);	
	}
	
	
	
  return (
	<div className='w-full  min-h-[200px] bg-grey_dark dark:bg-dark_bg text-grey_dark flex flex-col justify-center items-center z-10'>
		<center><h1 className='my-4 font-bold'>basic profile edit</h1></center>
		<div className='mx-4 flex flex-col'>
			<label htmlFor="name">Your user name</label>
		<input id='name'  placeholder='your new username' onChange={(e)=>validator.validate_username(e,setUserdata)} type="text" className='w-[200px] my-2 h-[40px] shadow-md outline-none rounded'  />
		<br />
		<label htmlFor="phone">phone number</label>
		<input id='phone'  onChange={(e)=>validator.check_number(e,setUserdata)} type="text" className='w-[200px] my-2 h-[40px] shadow-md outline-none rounded' 
		placeholder='phone number' />
			
			{/* status */}
						<fieldset className='flex flex-col'>
				<label htmlFor="status" className='mt-4 text-primary'>status</label>
				<radiogroup  id="status"  className="mb-4">
					<span onChange={(e)=>setUserdata(prev=>({
			...prev,
			status:e.target.value
		}))} className='ml-4'><input type="radio" className='accent-primary'  name='status'  value="single" />&nbsp;single</span>
					<span onChange={(e)=>setUserdata(prev=>({
			...prev,
			status:e.target.value
		}))} className='ml-4'><input type="radio" className='accent-primary'  name='status' value="dating" />&nbsp;dating</span>
					<span onChange={(e)=>setUserdata(prev=>({
			...prev,
			status:e.target.value
		}))} className='ml-4'><input type="radio" className='accent-primary' name='status'  value="not tell" />&nbsp;not tell</span>
				</radiogroup>
			</fieldset>			
			<button className='bg-primary text-light_bg p-1 w-[150px] h-[40px] rounded mb-4' onClick={handlesignIn}>edit information</button>
		</div>
	</div>
  )
}

export default Basicedit