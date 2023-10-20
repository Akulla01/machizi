import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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
	<div className='z-10 w-full min-h-[200px] bg-grey_dark dark:bg-dark_bg text-grey_dark'>
		<center><h1 className='my-4 font-bold'>Change your profile image</h1></center>
		<div className='mx-4 flex justify-center items-center flex-col'>
			{/* image  upload field */}
			<label className='my-4 cursor-pointer p-4 border-dashed border-2' htmlFor="profile">
				click here to upload profile
			</label>
			<input onChange={handleImageUpload} className='hidden my-4' type="file" id='profile' />
			<br />
			<img className='my-4 w-[150px] h-[150px] object-cover rounded-[100vh] border-dark_overlay border-2 border-dashed' src={image?image:null} alt='no image selected click here☝'/>
			<button className='bg-primary text-light_bg p-1 w-[150px] h-[40px] rounded mb-4' onClick={handleProfileChange}>change profile</button>
		</div>
	</div>
  )
}

export default Profileedit