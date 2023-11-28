import React from 'react';
import "../custom_styles/bubble_loader_animator.css";

function Bubbleloader() {
  return (
	<div  className='absolute top-[50%] left-[45%] flex items-center justify-center gap-2'>
		<div id='bubble1' className='w-[10px] h-[10px] bg-grey_dark rounded-[100vh]'></div>
		<div id='bubble2' className='w-[10px] h-[10px] bg-grey_dark rounded-[100vh]'></div>
		<div id='bubble3' className='w-[10px] h-[10px] bg-grey_dark rounded-[100vh]'></div>
	</div>
  )
}

export default Bubbleloader