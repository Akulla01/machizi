import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import User from '../modules/user_db';
import Validator from '../modules/validator';

function Signin() {
	
	// const payload data 
	
	var user_request = new User();
	const [image,setImage] = useState('');
	var validator = new Validator();
	const [userdata,setUserdata] = useState({
		name:'',
		email:'',
		phone:'',
		password:'',
		gender:'',
		status:'',
		profile:''
	})
	
	// handle image upload
	const handleImageUpload = (e) => {
		e.preventDefault();
		  const selectedImage = e.target.files[0];
		  const imageUrl = URL.createObjectURL(selectedImage);
		  setImage(imageUrl);
		  setUserdata(prev=>({
			...prev,
			profile:selectedImage
		  }));
	  };
	const [show,setShow] = useState(false);
	
	
	const handlesignIn =()=>{
		var form_data = new FormData();
		form_data.append('name',userdata.name);
		form_data.append('email',userdata.email);
		form_data.append('phone',userdata.phone);
		form_data.append('gender',userdata.gender);
		form_data.append('profile',userdata.profile);
		form_data.append('status',userdata.status);
		form_data.append('password',userdata.password);
		user_request.account('signup',form_data);	
	}
	
  return (
	<div className='w-full min-h-[200px] '>
		<center><h1 className='my-4 font-bold'>Sign in (congratulation 👏)</h1></center>
		<div className='mx-4'>
		<input  onChange={(e)=>validator.validate_username(e,setUserdata)} type="text" className='w-[200px] my-2 h-[40px] shadow-md outline-none rounded' placeholder='user name' />
		<input  onChange={(e)=>setUserdata(prev=>({
			...prev,
			email:e.target.value
		}))} type="email" className='w-[200px] my-2 h-[40px] shadow-md outline-none rounded' placeholder='email' />
		<input  onChange={(e)=>validator.check_number(e,setUserdata)} type="text" className='w-[200px] my-2 h-[40px] shadow-md outline-none rounded' placeholder='phone number' />
			<div className='flex w-full'>
			<input onChange={(e)=>setUserdata(prev=>({
			...prev,
			password:e.target.value
		}))} className='w-[200px] h-[40px] shadow-md outline-none rounded my-2' type={show ? 'text' :'password'}  placeholder='enter password..' />
			<button className='border text-sm text-light_bg h-[40px] ml-2 my-2 px-1 rounded' onClick={()=>setShow(!show)}><FontAwesomeIcon icon={show? faEye : faEyeSlash }/>{show? 'hide' : 'show'}</button>
			</div>
			
			{/* gender */}
			<fieldset className='flex flex-col'>
				<label htmlFor="gender" className='mt-4 text-primary'>gender</label>
				<radiogroup id="gender"  className="mb-4">
					<span onChange={(e)=>setUserdata(prev=>({
			...prev,
			gender:e.target.value
		}))} className='ml-4'><input type="radio" className='accent-primary'  name='gender'  value="male" />&nbsp;male</span>
					<span onChange={(e)=>setUserdata(prev=>({
			...prev,
			gender:e.target.value
		}))} className='ml-4'><input type="radio" className='accent-primary'  name='gender' value="female" />&nbsp;female</span>
					<span onChange={(e)=>setUserdata(prev=>({
			...prev,
			gender:e.target.value
		}))} className='ml-4'><input type="radio" className='accent-primary' name='gender'  value="preffer not to tell" />&nbsp;not tell</span>
			</radiogroup>
			</fieldset>
			
			
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
			
			{/* image  upload field */}
			<label className='my-4 cursor-pointer border-2  p-4 border-dashed' htmlFor="profile">
				upload profile
			</label>
			<input onChange={handleImageUpload} className='hidden my-4' type="file" id='profile' />
			<br />
			<img className='my-4 w-[150px] h-[150px] object-cover rounded-[100vh] border-dark_overlay border-2 border-dashed' src={image?image:null}/>
			<button className='bg-primary text-light_bg p-1 w-[150px] h-[40px] rounded mb-4' onClick={handlesignIn}>sign in</button>
		</div>
	</div>
  )
}

export default Signin