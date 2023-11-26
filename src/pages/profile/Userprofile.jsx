import React, { useEffect, useState } from 'react'
import User from '../../modules/user_db'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import Post from '../../components/Post';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../loaders/Loader';
import Banner from '../../adselements/Banner';
import Inbuilt from '../../adselements/Inbuilt';
import Profileexpand from '../../components/Profileexpand';
import Basic from '../../modules/basic';
import Follower_profile from '../../components/Follower_profile';
import Viewmorefollowers from '../../components/Viewmorefollowers';
import useToken from '../../modules/useToken';


function Userprofile() {
	const request = new User();
	const [user,setUser] = useState(null);
	const [post,setPost] = useState([]);
	const user_params = useParams();
	const [followersProfiles,setfollowersProfiles] = useState([]);
	const navigate = useNavigate();
	const [viewall,setViewAll] = useState(false);
	const basic = new Basic();
	const [expand,setExpand] = useState(false);
	const payload ={master_id:user_params?.id};
	const {is_token} = useToken();
	useEffect(()=>{
		if(is_token){
		request.get_profile_with_token("get-user-profile-with-token",payload,setUser);
		}else{
		request.get_profile("get-user-profile",payload,setUser);	
		}
	},[]);
	useEffect(()=>{
		setPost(user?.user_post);
		setfollowersProfiles(user?.followers_profiles);
		console.log(user);
	},[user]);
	
  return (
	<div className='w-full bg-light_bg min-h-screen dark:bg-dark_bg dark:text-grey_dark text-grey_light'>
		{/* view more followers in your following */}
		{
			viewall ?
			<Viewmorefollowers
			close={setViewAll}
			followers={followersProfiles}			
			/>
			:
			<>
			{
			!expand ?
			<>
{
			!user &&(
				<div className='w-full h-screen flex items-center justify-center dark:bg-dark_bg'>
					<Loader/>
				</div>
			)
		}
				{
			user &&(
				<>	<div className='w-full py-2 min-h-[150px] shadow-2xl dark:text-light_bg  grid sm:grid-cols-2'>
			<div>
				<div className='flex flex-row gap-4 items-center text-grey_light dark:text-grey_dark'>
					
					<img src={user?.profile} onClick={()=>setExpand(true)} className='w-[60px] h-[60px] sm:w-[60px] sm:h-[60px] rounded-[100vh] object-cover mx-4 my-2 cursor-pointer' alt="" />
					<div>
					<h1 className='font-bold text-md sm:text-4xl my-2'>{user?.name}</h1>
					<div className='flex w-full items-center gap-4'>
						<span className='text-sm font-thin dark:text-grey_dark '>{user?.followers} followers</span>
						<span className='text-sm font-thin dark:text-grey_dark '>{post?.length} posts</span>
					</div>
					<div className='flex gap-4 my-4 items-center w-[90%]'>
					<span className='w-[80%]'>{!user?.bio ? basic.truncate("👋hey am on machizi....and I love it "):basic.truncate(user?.bio)}</span>
					</div>
					</div>
				</div>
			</div>
			<div className='flex items-center justify-center'>
				<button onClick={()=>navigate('/')} className='mx-2 border border-light_bg dark:text-grey_dark text-sm hover:text-grey_dark bg-primary font-bold p-2 rounded-md hover:bg-accent'><FontAwesomeIcon icon={faHome}/> back home</button>
				<button onClick={()=>request.edit_user("manage-followers",payload)} className={`mx-2 border border-light_bg dark:text-grey_dark text-sm hover:text-grey_dark 
				${user?.is_following ? 'bg-basic shadow-md rounded text-grey_light dark:bg-overlays dark:text-primary':'bg-light_overlay'}
				 font-bold p-2 rounded-md hover:bg-accent`}>{user?.is_following ? 'unfollow' : 'follow'}</button>
			</div>
		</div>
		<Follower_profile 
		user={user}
		viewall={setViewAll}
		 followersProfiles={followersProfiles}
		 />
		{/* <Banner isGlobal={true}/> */}
		{post && (
      <>
        <div className='md:w-[60%] md:ml-[20%] md:shadow-md min-h-screen dark:bg-dark_bg dark:text-grey_dark'>
          {
            post?.map(userpost=>(
				<>
				<Post key={userpost.id} userpost={userpost}/>
				{/* {
              userpost.id %6 === 0 && (
                <Inbuilt isGlobal={true}/>
              )
             } */}
				</>
              
			 
            ))
          }
          
        </div>
		</>
		)}
				</>
			)
		}
			
			</>
			:
			<>
			<Profileexpand user={user} close={setExpand}/>
			</>
		}
			
			</>
		}
	</div>
  )
}

export default Userprofile