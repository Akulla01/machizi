import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import User from '../modules/user_db';

function Login() {
	const [show,setShow] = useState(false);
	const user_request = new User();
	const [userData,setuserData] = useState({
		email:'',
		password:''
	});
	
	const handleLogin = () =>{
		alert("log in initiated");
		user_request.account('login',userData);
	}
	
	
  return (
	<div className='w-full min-h-[200px] '>
		<center><h1 className='my-4 font-bold'>Welcome back</h1></center>
		<div className='mx-4'>
			<input type="email" onChange={(e)=>setuserData(prev =>({
				...prev,
				email:e.target.value
			}))} className='w-[200px] my-2 h-[40px] shadow-md outline-none rounded' placeholder='email' />
			<div className='flex w-full'>
			<input className='w-[200px] h-[40px] shadow-md outline-none rounded my-2' onChange={(e)=>setuserData(prev =>({
				...prev,
				password:e.target.value
			}))} type={show ? 'text' :'password'}  placeholder='enter password..' />
			<button className='border text-light_bg h-[40px] ml-2 my-2 px-1 rounded text-sm' onClick={()=>setShow(!show)}><FontAwesomeIcon icon={show? faEye : faEyeSlash }/>{show? 'hide' : 'show'}</button>
			</div>
			<button className='bg-primary text-light_bg p-1 w-[150px] h-[40px] rounded' onClick={handleLogin}>log in</button>
		</div>
	</div>
  )
}

export default Login