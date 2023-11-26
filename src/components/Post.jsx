import React, { useState } from 'react'
import '../custom_styles/post.css';
import Postheading from './Postheading';
import Postbody from './Postbody';
import Postcontrols from './Postcontrols';
import Postcomment from './Postcomment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';


export default function Post({userpost,id,status}) {
	const [showsensitive,setshowsensitive] = useState(localStorage.getItem("show_sensitive"));
	const media_type =userpost?.media_type;
	const sensitiveEnable = () =>{
		localStorage.setItem("show_sensitive","true");
		setshowsensitive(true);
	}
  return (
	<div id="post" className='w-full sm:w-[90%] sm:p-2 sm:mx-[5%] md:w-[70%] md:mx-[10%] min-h-[100px] my-10 mb-0'>
		{userpost?.post_sensitive ==1 && !showsensitive ? (
		<div className='w-full h-[400px] bg-crimson text-grey_dark my-4 flex flex-col rounded items-center justify-center'>
			
			<FontAwesomeIcon className='text-[40px] my-4' icon={faWarning}/>
			<h1 className='font-bold'>post owner message</h1>
			<span className='my-2'>sensitive post </span>
			<button className='border rounded hover:text-grey_light h-[40px] p-2' onClick={sensitiveEnable}>show anyways</button>
		</div>
	) 
	:
	<>
	<Postheading
		time={userpost?.created_at}
		heading={userpost?.post_description}
		 profile={userpost?.profile}
		  username={userpost?.user_name}
		  id={userpost.user_id}
		  />	
		<Postbody
		type={media_type}
		url={userpost?.post_media}
		id={userpost?.id}
		/>
		<Postcontrols
		id={userpost?.id}
		 likes={userpost?.likes}
		  comments={userpost?.comments.length}
		  />
		  <Postcomment username={userpost?.user_name} 
		  comment={userpost?.comments}
		   />
	</>
}
	
			
	 </div>
  )
}
