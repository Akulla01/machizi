import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEdit, faExclamation, faHome, faSignOut, faTrash, faUpload, faX } from '@fortawesome/free-solid-svg-icons';
import Basic from '../modules/basic';

function Follower_profile({followersProfiles,user,show,viewall}) {
	const basic = new Basic();
	// copy user link
	const copyLink = () =>{
		var link = document.getElementById("link");
		navigator.clipboard.writeText(link.value);
		toast.success("link copied");
	}
	
  return (
	<>
			{/* followers list */}
			<div className='w-full min-h-[100px] bg-gradient-to-r from-primary to-accent flex items-center flex-col justify-center text-grey_dark'>
			<h3 className='font-bold my-4 text-xl'>followers</h3>
			<div>
				
				{
					followersProfiles?.length > 0 &&
					<div id='hide' className='grid grid-cols-4 my-10 w-[90%] mx-4 min-h-[80px] gap-2 overflow-x-scroll scroll-m-0'>
						{
							followersProfiles?.slice(0,4).map(followers =>(
								<img 
								 onClick={()=>basic.redirect_user(`user-profile/${followers?.name}/${followers?.id}`)} 
								src={followers.profile}
								 title={followers.name}
								 className='object-cover w-[60px] h-[60px] rounded-[100vh] border-4  border-grey_white cursor-pointer' />
							))
						}

					
				</div>
				
				}
				{/* account link */}
				{
					show && (
				<div className='my-4 flex items-center flex-col justify-center w-full'>
				<h3>grow your followers..share link</h3>
				<div className='flex items-center my-10'>
				<input type="text" id='link' className='overflow-x-scroll w-[200px] h-[30px]' value={`https://machizi.kodesfusion.com/user-profile/${user?.name}/${user?.id}`} disabled />
				 <button className='text-grey_dark w-[100px] bg-primary h-[30px] rounded-tr-md rounded-br-md' onClick={copyLink}> <FontAwesomeIcon icon={faCopy}/> &nbsp;copy link</button>
				</div>
				
				</div>						
				)
				}


				{
					followersProfiles?.length >= 5 && (
				<center><button className='w-[150px] h-[40px] bg-primary text-grey_dark rounded my-4' onClick={()=>viewall(true)}>view all</button></center>						
					)
				}

			</div>
			
		</div>
	</>
  )
}

export default Follower_profile