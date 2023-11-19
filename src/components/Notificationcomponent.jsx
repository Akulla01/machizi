import React, { useEffect, useState } from 'react'
import User from '../modules/user_db'
import Loader from '../loaders/Loader';
import "../custom_styles/scroll.css";
import empty from "../assets/empty.svg";
import notifications from "../assets/notification.svg";

function Notificationcomponent({new_setter,show}) {
	const request = new User();
	const [notification,setNotification] = useState(null);
	
	useEffect(()=>{
				/* some endpoints may be used more than twice if they satisfy the required use case
		so this endpoint is not only used to edit user but can be used to fetch notification too
		 */
		request.edit_user("retrieve-notification",null,setNotification);
	},[]);
	
	// check if there is a new notification
	const check_new = ()=>{
		notification?.map(each =>{
			if(each.read == 0){
				// this means there is an unread notification
				new_setter(true);
				
			}
		});
	}
	
	function markasread(id){
		var payload = {
			post_id:id
		}
		request.edit_user("mark-notification",payload,null);
		request.edit_user("retrieve-notification",null,setNotification);
	}
	
	// delete notification
	function deletenotification(id){
		var payload = {
			post_id:id
		}
		request.edit_user("delete-notification",payload,null);
		request.edit_user("retrieve-notification",null,setNotification);
	}
	
	
	useEffect(()=>{
		check_new();
	},[notification]);

	
  return (
<div className='w-full sm:w-[400px] h-[400px] overflow-scroll mt-4 mx-4 z-50 bg-light_bg dark:bg-dark_overlay shadow-md' id='div_scroll'>
	<h1 className='m-2 font-bold h-[40px] flex items-center justify-center'>notification</h1>
	<hr className='mb-4' />
				{
			!notification &&(
				<div className='w-full h-full flex items-center justify-center'>
					<Loader/>
				</div>
			
			)
		}
		{notification &&(
		notification?.map(each_notification =>(
				<div key={each_notification.id} className='w-[80%] mx-[20px] min-h-[80px] shadow-xl rounded  my-10 flex flex-col gap-4 items-center cursor-pointer'>
					<div className='w-full flex'>
						<img src={notifications} className='w-[40px] h-[40px] rounded-[100vh] mx-4'/>
						<span className='font-bold text-sm'>{each_notification.message}</span>	
					</div>
					<div className='flex gap-4 my-2'>
				{each_notification.read == 0 &&(

				<button onClick={()=>markasread(each_notification.id)} className='text-[14px] dark:bg-dark_bg bg-light_overlay w-[100px] h-[40px] rounded hover:text-primary'>mark read</button>	
				)}
				<button onClick={()=>deletenotification(each_notification.id)} className='text-[14px] dark:bg-dark_bg bg-light_overlay w-[100px] h-[40px] rounded hover:text-primary'>delete</button>						
				</div>

			</div>
			))
		)}
		
		{notification?.length==0 && (
			<div className='w-full flex flex-col items-center justify-center my-2'>
					<img src={empty} className="w-[100px] h-[100px] my-4 rounded-[100vh]"/>
				<span className="my-4 text-sm font-regular mx-4">you are caught up</span>
				<button className='w-[100px] h-[40px] bg-primary rounded text-grey_dark my-4' onClick={()=>show(false)}>close</button>
			</div>
	
		)}
	</div>
  )
}

export default Notificationcomponent