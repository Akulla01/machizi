import { faComment, faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Post_handler from '../modules/post_db'
import "../custom_styles/like-animation.css";

function Postcontrols({likes,comments,id}) {
	const request = new Post_handler();
	const [comment,setComment] = useState('');
	
	// like animation
	const like_animation = (e) =>{
		request.post_with_token('like-post',{post_id:id})
		var like_icon = e.target;
		like_icon.classList.add("animate");
		setTimeout(() => {
			like_icon.classList.remove("animate");	
		},1000);
	}
	
	const message_animation = (e) =>{
		request.post_with_token('comment-post',{post_id:id,comment:comment})
		var message_icon = e.target;
		message_icon.classList.add("animate-message");
		setTimeout(() => {
			message_icon.classList.remove("animate-message");	
		},1000);
	}
	
	
	
  return (
	<div className=' w-full sm:h-[40px]'>
		<ul className='relative flex flex-col  sm:flex-row mr-2 h-full sm:w-[90%] sm:mx-[5%] gap-2 dark:text-grey_dark text-grey_light items-center justify-start'>
				<li className='flex flex-row items-center w-full md:w-[40%] h-full '>
					<span onClick={like_animation}  className='text-sm hover:bg-grey_dark sm:p-2 rounded-2xl cursor-pointer active:bg-primary dark:hover:bg-dark_overlay active:text-light_bg ml-4 '><FontAwesomeIcon icon={faThumbsUp}/> {likes}</span>
					<span  className=' mx-4 sm:mx-1 text-sm hover:bg-grey_dark p-2 cursor-pointer rounded-2xl active:bg-primary dark:hover:bg-dark_overlay active:text-light_bg '><FontAwesomeIcon icon={faComment}/> {comments}</span>
				</li>
				<li>
				<span className='text-sm  p-2 cursor-pointer rounded-2xl flex items-center'>
					<input type="text" className='h-[25px]  my-4 px-2 outline-none border-none bg-light_bg dark:bg-dark_overlay' onChange={(e)=>setComment(e.target.value)} placeholder='type comment..' />
					<button onClick={message_animation} className='mx-2 flex items-center justify-center h-[25px]  rounded px-2 hover:bg-primary hover:text-light_bg'><FontAwesomeIcon icon={faPaperPlane}/> post</button>
				</span>
				</li>
			</ul>
	</div>
  )
}

export default Postcontrols