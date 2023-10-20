import React, { useEffect, useState } from 'react'

function Postcomment({comment,username}) {
	const [perpage,setPerpage] = useState(1);
	const [newcomment,setNewcomment] = useState([]);
	const [hide_comment,sethide_comment] = useState(false);
	
	useEffect(()=>{
	  setNewcomment(comment ?comment.slice(0,perpage):null);
	},[comment]);
	useEffect(()=>{
	  setNewcomment(comment ?comment.slice(0,perpage):null);
	},[perpage]);
	
	const handle_infinite = () =>{
		
		if(comment.length==perpage){
			setPerpage(1);
		}else{
			setPerpage(prev =>(prev+2));
		}
	}
	
	const handleHide = () =>{	
			if(!hide_comment){
			setPerpage(0);	
			}else{
				setPerpage(1);
			}
			sethide_comment(!hide_comment);
	}
	
  return (
	<div className='w-full my-4 ml-2 sm:ml-10 dark:text-grey_dark'>		
		{
		newcomment?.map(eachcomment=>(
			<>
			<div className='w-full flex items-center gap-2  mb-4 cursor-pointer' onClick={()=>window.location.href=`/user-profile/${username}/${eachcomment.user_id
}`}>
			<img src={eachcomment.profile} className='w-[30px] h-[30px] rounded-[100vh] bg-grey_light object-cover' alt="" />
			<h3 >
			<span className='text-md text-grey_light font-bold font-roboto flex flex-col dark:text-light_bg'>{eachcomment.user_name}</span>
			<span className='text-[12px] text-grey_light  dark:text-grey_dark'>posted on: {eachcomment.created_at}</span>
			</h3>
			</div>
			<div className='w-full min-h-[20px] font-bold text-sm mb-4'>
			<p className='w-[90%] sm:mx-4 text-sm'>{eachcomment.user_comment}</p>
		</div>
		{comment.length>2 &&(
			<>
			<div className='w-[2px] rounded-md h-[40px] bg-grey_dark my-1'></div>
			<div className='w-[2px] rounded-md h-[2px] bg-grey_dark my-1'></div>
			<div className='w-[2px] rounded-md h-[2px] bg-grey_dark my-1'></div>
			<div className='w-[2px] rounded-md h-[2px] bg-grey_dark my-1'></div>
			</>
		)}
		
			</>
			
		))
	}
	{
		comment.length !==0 &&(
			<>
			<span className='underline hover:text-primary cursor-pointer' onClick={handleHide}>{hide_comment?'show comments':'hide comments'}</span> &nbsp;
			{
				!hide_comment && comment.length > 1 ?(
				<span className='underline hover:text-primary cursor-pointer' onClick={handle_infinite}>load more</span>	
				) :null
			}
			
			</>

				
		)
	}
	

	</div>
	
  )
}

export default Postcomment