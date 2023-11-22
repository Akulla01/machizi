import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUpload } from '@fortawesome/free-solid-svg-icons';
import User from '../modules/user_db';

function Profileedit({profile}) {
	
	// const payload data 
	
	var user_request = new User();
	const [image,setImage] = useState(profile);
	const [userdata,setUserdata] = useState({
		new_profile:'',
	})
	
	// handle image upload
	const handleImageUpload = (e) => {
		e.preventDefault();
		  const selectedImage = e.target.files[0];
		  const imageUrl = URL.createObjectURL(selectedImage);
		  setImage(imageUrl);
		  setUserdata(prev=>({
			...prev,
			new_profile:selectedImage
		  }));
	  };
	const [show,setShow] = useState(false);
	
	
	const handleProfileChange =()=>{
		var formData = new FormData();
		formData.append("new_profile",userdata.new_profile);
		user_request.edit_user("update-profile",formData);
	}
	
  return (
	<div className='text-grey_dark z-10 w-full min-h-[200px] bg-gradient-to-l  pt-4 from-primary to-accent dark:bg-dark_bg dark:text-grey_dark'>
		<center><h1 className='my-4 font-bold sm:text-xl xl:2xl'>Change your profile image</h1></center>
		<div className='mx-4 flex justify-center items-center flex-col'>
			{/* image  upload field */}
			<label className='my-4 cursor-pointer p-4 border-dashed border-2 h-[300px] sm:w-[300px] flex items-center justify-center font-bold flex-col' htmlFor="profile">
				<FontAwesomeIcon icon={faUpload} className='text-4xl my-4'/>
				click here to upload profile
			</label>
			<input onChange={handleImageUpload} className='hidden my-4' type="file" id='profile' />
			<br />

			<h1>your profile is or will be</h1>
			<img className='my-4 w-[150px] h-[150px] object-cover border-dark_overlay border-2 border-dashed' src={image?image:null} alt='no image selected click here☝'/>
			<button className='bg-primary text-light_bg p-1 w-[150px] sm:w-[300px] h-[40px] rounded mb-4 hover:bg-accent' onClick={handleProfileChange}>change profile</button>
		</div>
	</div>
  )
}

export default Profileedit