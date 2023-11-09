import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import User from '../modules/user_db';
import Validator from '../modules/validator';

function Signin() {
	
	// const payload data 
	
	var user_request = new User();
	const [image,setImage] = useState(null);
	const [agree,setAgree] = useState(false);
	const [step,setStep] = useState(1);
	var validator = new Validator();
	const [userdata,setUserdata] = useState({
		name:'',
		email:'',
		school:'',
		phone:'',
		password:'',
		gender:'',
		status:'',
		profile:'',
		public:"false"
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
		form_data.append('school',userdata.school);
		form_data.append('public',userdata.public);
		form_data.append('password',userdata.password);
		user_request.account('signup',form_data);	
	}
	
  return (
	<div className='w-full min-h-[200px] text-grey_light dark:text-grey_dark'>
		<center><h1 className='my-4 font-bold'>step {step} of 5 (congratulation 👏)</h1></center>
		<div className='mx-4'>
			{
				step == 1 && (
					<div className='flex flex-col w-full'>
					<label htmFor="username" className='text-sm mt-4 text-grey_light dark:text-grey_dark'> username(no space)</label>
					<input id="username" 
					 onChange={(e)=>validator.validate_username(e,setUserdata)} 
					 type="text" 
					 value={userdata.name}
					 className='w-[80%] min-w-[200px] my-2 h-[40px] shadow-md outline-none rounded focus:border-4   focus:border-primary   focus:text-grey_light'
					  placeholder='user name' />
					<label htmFor="email" className='text-sm mt-4 text-grey_light dark:text-grey_dark'> email(enter a working email)</label>
					<input  onChange={(e)=>setUserdata(prev=>({
			...prev,
			email:e.target.value
		}))}
		 type="email" 
		 id='email'
		 value={userdata.email}
		 className='w-[80%] min-w-[200px] my-2 h-[40px] shadow-md outline-none rounded focus:border-4   focus:border-primary   focus:text-grey_light' 
		placeholder='email' />
		
		{/* user school */}
		<label htmFor="school" className='text-sm mt-4 text-grey_light dark:text-grey_dark'>Your school</label>
		<input id="school" 
			onChange={(e)=>setUserdata(prev=>({
			...prev,
			school:e.target.value.toLowerCase()
			}))} 
			type="text" 
			value={userdata.school}
			className='w-[80%] min-w-[200px] my-2 h-[40px] shadow-md outline-none rounded focus:border-4   focus:border-primary   focus:text-grey_light'
			placeholder='enter your school eg Maseno,Strathmore' />
			
			<div className='flex'>
			<input type="checkbox"
			onChange={(e)=>setUserdata(prev=>({
				...prev,
				public:"true"
				}))} 
			 value="true" 
			  id="public" />	
			<label htmlFor="public"> &nbsp; make my profile public</label>
			</div>
			
		</div>
			)
		}
		
		{
			step == 2 &&(
				<div className='flex flex-col w-full'>
					<label className='text-sm mt-4 text-grey_light dark:text-grey_dark' htmFor="phone"> phone(format: 07-XXXX-XXXX)</label>
					<input 
					 onChange={(e)=>validator.check_number(e,setUserdata)}
					 type="text"
					 value={userdata.phone}
					 className='w-[80%] min-w-[200px] my-2 h-[40px] shadow-md outline-none rounded focus:border-4   focus:border-primary   focus:text-grey_light'
					  id='phone'
					   placeholder='phone number' />
					   <label className='text-sm mt-4 text-grey_light dark:text-grey_dark' htmFor="password">enter your password</label>
					<div className='flex w-full'>	
					<input 
					onChange={(e)=>setUserdata(prev=>({
					...prev,
					password:e.target.value
					}))} className='w-[80%] min-w-[200px] my-2 h-[40px] shadow-md outline-none rounded focus:border-4   focus:border-primary   focus:text-grey_light' type={show ? 'text' :'password'} 
					id='password' 
					value={userdata.password}
					placeholder='enter password..' />
					<button className='border text-sm text-light_bg h-[40px] ml-2 my-2 px-1 rounded' onClick={()=>setShow(!show)}><FontAwesomeIcon icon={show? faEye : faEyeSlash }/>{show? 'hide' : 'show'}</button>
					</div>
				</div>
			)
		}

			{
				step == 3 && (
					<>
			{/* gender */}
			<fieldset className='flex flex-col'>
				<label htmlFor="gender" className='mt-4 text-primary'>gender</label>
				<radiogroup id="gender"  className="mb-4">
					<span onChange={(e)=>setUserdata(prev=>({
			...prev,
			gender:e.target.value
		}))} className='ml-4'>
			<input type="radio" className='accent-primary' 
			  name='gender' 
			   value="male" />&nbsp;male</span>
					<span onChange={(e)=>setUserdata(prev=>({
			...prev,
			gender:e.target.value
		}))}
		 className='ml-4'
		 ><input type="radio" 
		 className='accent-primary' 
		  name='gender'
		   value="female"
		    />&nbsp;female
			</span>
					<span onChange={(e)=>setUserdata(prev=>({
			...prev,
			gender:e.target.value
		}))} className='ml-4'><input type="radio" className='accent-primary' name='gender'  value="preffer not to tell" />&nbsp;not tell</span>
			</radiogroup>
			</fieldset>
					</>
				)
			}

			{
				step == 4 && (
					<>
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
					</>
				)
			}
			
			
			{
				step ===5 && (
					<div className='my-10 mx-4'>
				{/* image  upload field */}
			<label className='my-4 cursor-pointer border-2  p-4 border-dashed' htmlFor="profile">
				upload profile
			</label>
			<input onChange={handleImageUpload} className='hidden my-4' type="file" id='profile' />
			<br />
			{
				image && (
			<img className='my-4 w-[150px] h-[150px] object-cover rounded-[100vh] border-dark_overlay border-2 border-dashed' src={image?image:null}/>					
				)
			}

			<br />
			<input onChange={()=>setAgree(!agree)} type="checkbox"  className='accent-primary'  /> 
			&nbsp;I agree to <a href="/terms" className='underline text-primary hover:text-accent'>terms and conditions</a> 
			{
				agree &&(
				<button className='bg-primary text-light_bg p-1 w-[150px] h-[40px] rounded mb-4' onClick={handlesignIn}>sign in</button>	
				)
			}					
			</div>
				)
			}
			
			{
				step !=5 && (
				<div className='my-10'>
					{step > 1 && (
					<button
					className='w-[100px] h-[30px] border rounded mx-4 hover:border-none hover:bg-primary' 
					  onClick={()=>setStep(prev => (prev-=1))}>
						previous
						</button>						
					)}
					
					<button
					 className={`
					${step == 1 ? ' rounded w-[80%] h-[40px] border-none bg-accent hover:bg-primary':'border rounded mx-4 hover:border-none hover:bg-primary w-[100px] h-[30px]'}
					  `} 
					  onClick={()=>setStep(prev => (prev+=1))}>next</button>
				</div>	
				)
			}

			
		</div>
	</div>
  )
}

export default Signin