import React, { useEffect, useState } from 'react'
import User from '../modules/user_db'
import Loader from '../loaders/Loader';

function Notificationcomponent({new_setter}) {
	const request = new User();
	const [notification,setNotification] = useState(null);
	const [show,setShow] = useState(true);
	
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
	}
	
	// delete notification
	function deletenotification(id){
		var payload = {
			post_id:id
		}
		request.edit_user("delete-notification",payload,null);
	}
	
	
	useEffect(()=>{
		check_new();
	},[notification]);

	
  return (
<div className='w-full min-h-[25px] mt-4 z-50 bg-light_bg dark:bg-dark_overlay shadow-md'>
	<h1 className='m-2 font-bold'>notification</h1>
				{
			!notification &&(
				<div className='w-full h-full flex items-center justify-center'>
					<Loader/>
				</div>
			
			)
		}
		{notification &&(
		notification?.map(each_notification =>(
				<div key={each_notification.id} className='w-[90%] h-[80px] my-2 mx-2 flex items-center cursor-pointer gap-2'>
				<span className='font-bold text-sm'>{each_notification.message}</span>
				{each_notification.read == 0 &&(
				<button onClick={()=>markasread(each_notification.id)} className='w-[100px] h-[35px] border border-grey_light text-grey_light hover:bg-accent text-sm hover:text-light_bg rounded'>mark read</button>	
				)}
				<button onClick={()=>deletenotification(each_notification.id)} className='w-[100px] h-[35px] bg-primary hover:bg-accent text-light_bg rounded'>delete</button>
			</div>
			))
		)}
		
		{notification?.length==0 && (
				<span className="my-4 text-sm font-regular mx-4">new notification will appear here </span>
		)}
	</div>
  )
}

export default Notificationcomponent