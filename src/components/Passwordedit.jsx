import React, { useState } from 'react'
import User from '../modules/user_db';
import upload3 from "../assets/upload3.svg";
function Passwordedit() {
	var user_request = new User();
	const [password,setPassword] = useState({
		old_password:'',
		new_password:''
	});
	
	
  return (
	<div className=' 
	my-40
	w-full z-10  min-h-[200px] bg-grey_dark dark:bg-dark_bg text-grey_dark   flex items-center justify-center flex-col-reverse sm:flex-row'>
		<div className='flex flex-col text-grey_light dark:text-grey_dark my-4'>
         <center><h1 className='font-bold text-sm md:text-md xl:text-xl'>change password</h1></center>
		
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
		
		<div>
			<img src={upload3} className='w-[300px] h-[300px]' />
		</div>
	</div>
  )
}

export default Passwordedit