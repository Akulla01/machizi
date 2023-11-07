import React, { useEffect, useState } from 'react'
import User from '../modules/user_db';
import Basic from '../modules/basic';

function Searchfollower({search_param,show}){
	const [profiles,setProfiles] = useState([]);
	const [new_profile,setnew_profile] = useState(null);
	const request = new User();
	const basic = new Basic();
	useEffect(()=>{
		request.get_profile("all-users",null,setProfiles);
	},[]);
	
	useEffect(()=>{
	 const filtered = profiles?.filter(user_profile => user_profile.user_name.toLowerCase()
	 .includes(search_param));
		setnew_profile(filtered);
	},[search_param]);
	
	
		
  return (
	<div className='w-full min-h-[25px] max-h-[400px] shadow mt-4 z-50 bg-light_bg dark:bg-dark_bg mb-0 overflow-y-clip'>
		<span onClick={()=>show(false)} className='mt-4 text-light_bg p-2 rounded text-sm hover:bg-primary  cursor-pointer bg-grey_light dark:bg-dark_overlay'>✖ &nbsp;close</span>
				{
			!profiles &&(
				<div className='w-full h-full flex items-center justify-center'>
					<Loader/>
				</div>
			
			)
		}
		{profiles && (
			new_profile?.map(each_follower =>(
				<div onClick={()=>basic.redirect_to_profile(each_follower.user_name,each_follower.user_id)} key={each_follower.user_id} className='w-[90%] h-[80px] my-2 mx-2 flex items-center cursor-pointer'>
				<img className='w-[60px] h-[60px] rounded-[100vh] object-cover bg-grey_light hover:border-primary' src={each_follower.profile}  />
				<div className='flex flex-col mx-2'>
				<span className='font-bold text-sm'>{each_follower.user_name}</span>
				<button className='w-[100px] h-[35px] bg-primary hover:bg-accent text-light_bg rounded' onClick={()=>manageFollow(each_follower.user_id)}>follow</button>
				</div>

			</div>
			))
		)}
		<button onClick={()=>setusers_at_a_time(prev=>prev+=2)} className='w-full my-4 bg-primary text-light_bg hover:text-dark h-[40px] mb-0'>load more</button>
	</div>
  )
}

export default Searchfollower