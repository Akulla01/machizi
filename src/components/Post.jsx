import React from 'react'
import '../custom_styles/post.css';
import Postheading from './Postheading';
import Postbody from './Postbody';
import Postcontrols from './Postcontrols';
import Postcomment from './Postcomment';


export default function Post({userpost,id,status}) {
	const media_type =userpost?.media_type;
  return (
	<div id="post" className='w-full sm:w-[90%] sm:p-2 sm:mx-[5%] md:w-[70%] md:mx-[10%] min-h-[100px] my-10 mb-0'>
		<Postheading
		time={userpost.created_at}
		heading={userpost.post_description}
		 profile={userpost.profile}
		  username={userpost.user_name}
		  id={id}
		  />	
		<Postbody
		type={media_type}
		url={userpost.post_media}
		id={id}
		/>
		<Postcontrols
		id={userpost.id}
		 likes={userpost.likes}
		  comments={userpost.comments.length}
		  />
		  <Postcomment username={userpost.user_name} 
		  comment={userpost.comments}
		   />
	 </div>
  )
}
