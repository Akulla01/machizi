import React, { useEffect, useState } from 'react'
import User from '../modules/user_db';
import Basic from '../modules/basic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import "../custom_styles/scroll.css";

function Searchfollower({search_param,show}){
	const [profiles,setProfiles] = useState([]);
	const [new_profile,setnew_profile] = useState(null);
	const request = new User();
	const basic = new Basic();
	const [users_at_a_time,setusers_at_a_time] = useState(5);
		
	useEffect(()=>{
		request.get_profile("all-users",null,setProfiles);
	},[]);
	
	
	useEffect(()=>{
	 const filtered = profiles?.filter(user_profile => user_profile.user_name.toLowerCase()
	 .includes(search_param));
		setnew_profile(filtered);
	},[search_param]);
	
	
		
  return (
	// button to close the  search users div
	<div className='w-full min-h-[25px] max-h-[400px]  mt-4 z-50 bg-light_bg dark:bg-dark_bg mb-0 overflow-y-scroll overflow-x-hidden text-grey_dark dark:shadow-grey_dark shadow-sm'>
		<div className='w-[90%] my-4 flex items-center justify-around p-2'>
		<span>user profiles</span>
			<span onClick={()=>show(false)} className='w-[30px] h-[30px] bg-primary cursor-pointer hover:bg-accent rounded-[100vh] flex items-center justify-center'>
				<FontAwesomeIcon icon={faClose}/>
			</span>
			
		</div>
		<hr width="90%"/>
		
		
		
				{
			!profiles &&(
				<div className='w-full h-full flex items-center justify-center'>
					<Loader/>
				</div>
			
			)
		}
		{profiles && (
			new_profile?.slice(0,users_at_a_time).map(each_follower =>(
				<div onClick={()=>basic.redirect_to_profile(each_follower.user_name,each_follower.user_id)} 
				key={each_follower.user_id} className='w-[90%] h-[80px] my-2 rounded p-2 flex items-center cursor-pointer bg-gradient-to-r hover:transition-all hover:duration-500 hover:bg-gradient-to-l from-primary to-accent mx-4'>
				<img className='w-[60px] h-[60px] rounded-[100vh] object-cover bg-grey_light hover:border-primary' src={each_follower.profile}  />
				<div className='flex flex-col mx-2'>
				<span className='font-bold text-sm w-[80%] overflow-hidden my-2  min-h-0'>{each_follower.user_name}... </span>
				<span className='my-2 text-[14px] text-center bg-accent w-[100px] h-[30px] p-1 rounded'>view profile</span>
				</div>

			</div>
			))
		)}
		<button onClick={()=>setusers_at_a_time(prev=>prev+=5)} className='w-full my-4 bg-primary text-light_bg hover:text-dark h-[40px] mb-0'>load more</button>
	</div>
  )
}

export default Searchfollower