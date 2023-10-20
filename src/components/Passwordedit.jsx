import React, { useState } from 'react'
import User from '../modules/user_db';
function Passwordedit() {
	var user_request = new User();
	const [password,setPassword] = useState({
		old_password:'',
		new_password:''
	});
	
	
  return (
	<div className='w-full z-10  min-h-[200px] bg-grey_dark dark:bg-dark_bg text-grey_dark my-4  flex items-center justify-center flex-col'>
		<center><h1>change password</h1></center>
		
		<input type="text" onChange={(e)=>setPassword(prev =>({
			...prev,
			old_password:e.target.value
		}))}  className='w-[200px] my-2 h-[40px] shadow-md outline-none rounded' placeholder='your old password'  />
		<input type="text"  onChange={(e)=>setPassword(prev =>({
			...prev,
			new_password:e.target.value
		}))} className='w-[200px] my-2 h-[40px] shadow-md outline-none rounded' placeholder='your new password'  />
		<button className='bg-primary text-light_bg p-1 w-[150px] h-[40px] rounded mb-4' onClick={()=>user_request.edit_user("update-password",password)}>change password</button>
	</div>
  )
}

export default Passwordedit