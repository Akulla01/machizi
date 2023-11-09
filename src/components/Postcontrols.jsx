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
				<li className='flex flex-row items-center w-full md:w-[40%] h-full text-md'>
					<span onClick={like_animation}  className='shadow-md mx-4 flex gap-2 sm:mx-1 text-md hover:bg-grey_dark items-center justify-center font-bold p-2 cursor-pointer rounded-2xl active:bg-primary dark:hover:bg-dark_overlay active:text-light_bg '><FontAwesomeIcon icon={faThumbsUp}/> <span>{likes}</span></span>
					<span  className=' font-bold shadow-md mx-4 flex items-center gap-2 sm:mx-1 text-md hover:bg-grey_dark p-2 justify-center cursor-pointer rounded-2xl active:bg-primary dark:hover:bg-dark_overlay active:text-light_bg '><FontAwesomeIcon icon={faComment}/> <span>{comments}</span></span>
				</li>
				<li>
				<span className='text-sm  p-2 cursor-pointer rounded-2xl flex items-start'>
					<input type="text" className='shadow-md h-[40px] ml-2 w-[150px] sm:w-[150px] rounded-bl-md rounded-tl-md outline-none px-2 border-none bg-light_overlay dark:bg-dark_overlay' onChange={(e)=>setComment(e.target.value)} placeholder='type comment..' />
					<button onClick={message_animation}
					 className='shadow-md w-[100px] flex items-center justify-center h-[40px] rounded-br-md  rounded-tr-md bg-light_overlay text-grey_light dark:bg-dark_overlay dark:text-grey_dark hover:bg-primary hover:text-light_bg'><FontAwesomeIcon icon={faPaperPlane}/>&nbsp;post</button>
				</span>
				</li>
			</ul>
	</div>
  )
}

export default Postcontrols