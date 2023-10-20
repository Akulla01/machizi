import React, { useEffect, useState } from 'react'
import User from '../modules/user_db'
import Loader from '../loaders/Loader';
import '../custom_styles/scroll.css';

function Followercomponent() {
	const request = new User();
	const [follower_list,setfollower_list] = useState(null);
	const [show,setShow] = useState(true);
	
	useEffect(()=>{
		request.get_follower_recommendation(setfollower_list);
	},[]);
	
	function manageFollow(id){
		const payload ={
			master_id:id
		}
		request.edit_user("manage-followers",payload);
	}
  return (
	<div id='follower-scroll' className={`w-full sm:w-[90%] overflow-scroll dark:text-grey_dark min-h-[200px] shadow-sm my-10 flex dark:bg-dark_bg
	${!show && 'hidden'}
	${follower_list?.length == 0 && 'hidden'}
	`}>
		<span onClick={()=>setShow(false)} title="close window" className='text-sm cursor-pointer hover:text-primary mt-6 text-grey_light dark:text-grey_dark font-extrabold mx-4'> 
			X
		</span>
		{
			!follower_list &&(
				<div className='w-full h-full flex items-center justify-center dark:bg-dark_bg'>
					<Loader/>
				</div>
			
			)
		}
		{follower_list &&(
			follower_list?.map(each_follower =>(
				<div key={each_follower.user_id} className='w-[200px] h-[200px] my-4 mt-10 mx-2 flex flex-col items-center'>
				<img className='w-[100px] h-[100px] rounded-[100vh] object-cover bg-grey_light dark:bg-dark_overlay hover:border-primary' src={each_follower.profile}  />
				<span className='font-bold '>{each_follower.user_name}</span>
				<button className='w-[100px] h-[35px] bg-primary hover:bg-accent text-light_bg rounded' onClick={()=>manageFollow(each_follower.user_id)}>follow</button>
			</div>
			))
		)}

	</div>
  )
}

export default Followercomponent