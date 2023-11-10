import React, { useEffect, useState } from 'react'
import Post_handler from '../modules/post_db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Loaderwithmessage from'../loaders/Loaderwithmessage'
import Basic from '../modules/basic';
import { toast } from 'react-toastify';
import Banner from "../../src/adselements/Banner";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';

function Addpost() {
	const request = new Post_handler();
	const [step,setStep] = useState(1);
	const basic = new Basic();
	const [message,setMessage] = useState({
		sent:false,
		response:null
	});
	const [Value , setValue] = useState("whats going on in your university....");
	const [userData,setuserData] = useState({
		post_heading:Value,
		post_tags:'',
		post_sensitive:"false",
		post_media:null
	});
	const [media,setMedia] = useState({
		url:'',
		type:null
	});
	
	
	// modules for the editor [quill-react];
const modules = {
    toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'], 
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ 'font': [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link','video'],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['clean'],
    ],
    clipboard: {
    matchVisual: false,
    },
    'history': {          
      'delay': 2500,
      'userOnly': true
    },
  };
	
  useEffect(()=>{
	setuserData(prev=>({
		...prev,
		post_heading:Value
	  }));
  },[Value]);
		// this function show the preview of the image or video that the user has selected		
		const handleMediaUpload = (e) => {
			e.preventDefault();
			  const selectedMedia = e.target.files[0];
			  const mediaUrl = URL.createObjectURL(selectedMedia);
			  setMedia(prev =>({
				...prev,
			url:'',
			type:null
			}));
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
			  setStep(prev => (prev+=1));	
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
			formData.append("post_tags",userData.post_tags);
			formData.append("post_sensitive",userData.post_sensitive);
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
		message={`
		Large files will take time ...keep the window open..
		reload to try again and make sure you have strong internet connection. 
		`}
		 />
		):null}
		<h1 className='text-md font-bold my-4'>Add post {step} of 5</h1>
		
		{
			step == 1 && (
				<div className='my-10 min-h-[150px] bg-light_overlay dark:bg-dark_overlay text-grey_light dark:text-grey_dark'>
			<ReactQuill 
			className=' w-[90%] sm:w-[400px] dark:bg-dark_overlay rounded-sm border-none text-grey_light dark:text-grey_dark h-[100%]'
			theme="snow" 
			value={Value} 
			onChange={setValue}
			modules={modules}
			/>
				</div>
			)
		}

		{
			step == 2 && (
				<>
				<label>use comma to separate tags</label>
				<span>tags help your videos reach a wide audience</span>
				<input id="username" 
					 onChange={(e)=>setuserData(prev =>({
						...prev,
						post_tags:e.target.value
					 }))} 
					 type="text" 
					 value={userData.post_tags}
					 className='w-[300px] min-w-[200px] my-2 h-[40px] shadow-md outline-none rounded focus:border-4   focus:border-primary   focus:text-grey_light'
					  placeholder='eg: maseno,football,class ' />
				</>
			)
		}
		
		{
			step == 3 && (
				<>
				<h1> skip if your post doesn't contains image or video</h1>
				<label htmlFor="media" className='border my-4 border-dashed p-10 rounded cursor-pointer'><FontAwesomeIcon icon={faImage}/> choose a media  file</label>
				<input type="file" className='hidden' onChange={handleMediaUpload} id='media' />
				</>
			)
		}


			{
				step == 4 && (
					<div className='my-4 font-bold'>
						<h3>your selected image</h3>
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
						<div className='flex my-4'>
							<input type="checkbox"
							value="true"
							onChange={(e)=>setuserData(prev =>({
								...prev,
								post_sensitive:e.target.value
							 }))} 
							id="sensitive" />
							<label htmlFor="sensitive"> post contain disturbing images or videos</label>
						</div>
					</div>	
				)
			}
			
			
			{
				step == 5 && (
					<div>
						
					<button className='text-grey_dark hover:bg-accent w-[150px] h-[40px] bg-primary' onClick={handleUpload}>upload</button>
					<button
					className='w-[100px] h-[40px] border rounded mx-4 hover:border-none hover:bg-primary' 
					  onClick={()=>setStep(prev => (prev-=1))}>
						previous
						</button>
					<button className='text-grey_dark hover:bg-accent w-[150px] my-4 h-[40px] border hover:border-none' onClick={()=>basic.home()}>back home</button>						
					</div>
				)
			}
			
			{
				step !=5 && (
				<div className='my-10'>
					{step > 1 && (
					<button
					className='w-[100px] h-[40px] border rounded mx-4 hover:border-none hover:bg-primary' 
					  onClick={()=>setStep(prev => (prev-=1))}>
						previous
						</button>						
					)}
					
					<button
					className='w-[100px] h-[40px] border rounded mx-4 hover:border-none hover:bg-primary' 
					  onClick={()=>setStep(prev => (prev+=1))}>next</button>
					  <button className='w-[100px] h-[40px] border rounded mx-4 hover:border-none hover:bg-primary'  onClick={()=>basic.home()}>back home</button>
				</div>	
				)
			}



		<br />
		<br />
		<span className='text-primary my-2 text-sm'> ⚠currently you can only upload videos less than 20 minutes only</span>
		<Banner isGlobal={true}/>
	</div>
  )
}

export default Addpost