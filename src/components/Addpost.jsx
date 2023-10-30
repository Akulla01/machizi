import React, { useEffect, useState } from 'react'
import Post_handler from '../modules/post_db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Loaderwithmessage from'../loaders/Loaderwithmessage'
import Basic from '../modules/basic';
import { toast } from 'react-toastify';
import Banner from "../../src/adselements/Banner";

function Addpost() {
	const [with_media,setwith_media] = useState(false);
	const request = new Post_handler();
	const basic = new Basic();
	const [message,setMessage] = useState({
		sent:false,
		response:null
	});
	const [userData,setuserData] = useState({
		post_heading:'',
		post_media:null
	});
	const [media,setMedia] = useState({
		url:'',
		type:null
	});
	
		// this function show the preview of the image or video that the user has selected		
		const handleMediaUpload = (e) => {
			e.preventDefault();
			  const selectedMedia = e.target.files[0];
			  const mediaUrl = URL.createObjectURL(selectedMedia);
			  
			  setuserData(prev=>({
				...prev,
				post_media:selectedMedia
			  }));
			  if(selectedMedia.type.includes('video')){
				var  size = selectedMedia.size/(1024*1024);
				console.log(size);
				// if its greater than 500MB
				if(size > 500){
					toast.error("your video is too long..it may not upload.");
				}
				setMedia(prev =>({
					...prev,
				url:mediaUrl,
				type:'video'
				}));				
			  }
			  if(selectedMedia.type.includes('image')){
				setMedia(prev =>({
					...prev,
					url:mediaUrl,
					type:'image'
					}));
			  }  
		  };
		  
		  
		  /* handle upload */
		  const handleUpload = (e) =>{
			e.preventDefault();
			setMessage(prev=>({
				...prev,
				sent:true
			}));
			
			var formData = new FormData();
			formData.append("post_description",userData.post_heading);
			formData.append("post_media",userData.post_media);
			request.post_with_token('create-post',formData,setMessage);
		  }
	
	
  return (
	<div className={`shadow-md rounded bg-light_bg w-full
	${message.sent && 'overflow-y-clip overflow-hidden h-0'}
	 min-h-screen flex items-center flex-col
	  dark:bg-dark_bg dark:text-grey_dark`}>
		{message.sent && message.response == null ? (
		<Loaderwithmessage 
		filewarn="files larger than 20 minutes are not supported"
		message={`Large video files will take time😞|| keep this window open creating your post...be patient`}
		 />
		):null}
		<h1 className='text-md font-bold my-4'>Add post</h1>
		<textarea className=' w-[90%] sm:w-[400px] dark:bg-dark_overlay rounded-sm px-1 mb-4 h-[150px]' onChange={(e)=>setuserData(prev =>({
			...prev,
			post_heading:e.target.value
		}))}
		 placeholder="what is going on in your university right now?">
			
		</textarea>
		
		{
		with_media && (
				<>
				<label htmlFor="media" className='border my-4 border-dashed p-10 rounded cursor-pointer'><FontAwesomeIcon icon={faImage}/> choose a media</label>
				<input type="file" className='hidden' onChange={handleMediaUpload} id='media' />
				</>
		)}

		<div className='my-4 font-bold'>
			<input type="checkbox" onChange={(e)=>setwith_media(!with_media)} id='media' className='accent-primary text-light_bg' />
			<label htmlFor="media">  add image or video</label>
			<div>
				{
					media.type =='video' && (
						<video src={media.url} controls className='w-[400px] h-[250px]'></video>
					)
				}
				{
					media.type =='image' && (
						<img src={media.url}  className='w-[300px] h-[250px]'/>
					)
				}
			</div>
		</div>
		<button className='text-grey_dark hover:bg-accent w-[150px] h-[40px] bg-primary' onClick={handleUpload}>upload</button>
		<button className='text-grey_dark hover:bg-accent w-[150px] my-4 h-[40px] border hover:border-none' onClick={()=>basic.home()}>back home</button>
		<br />
		<br />
		<span className='text-primary my-2 text-sm'> ⚠currently you can only upload videos less than 20 minutes only</span>
		<Banner isGlobal={false}/>
	</div>
  )
}

export default Addpost