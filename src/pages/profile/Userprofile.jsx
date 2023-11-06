import React, { useEffect, useState } from 'react'
import User from '../../modules/user_db'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faHome, faSignOut, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import Post from '../../components/Post';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../loaders/Loader';
import Banner from '../../adselements/Banner';
import Inbuilt from '../../adselements/Inbuilt';


function Userprofile() {
	const request = new User();
	const [user,setUser] = useState(null);
	const [post,setPost] = useState([]);
	const user_params = useParams();
	const navigate = useNavigate();
	const payload ={master_id:user_params.id};
	useEffect(()=>{
		request.get_profile("get-user-profile",payload,setUser);
	},[]);
	useEffect(()=>{
		setPost(user?.user_post);
	},[user]);
	
  return (
	<div className='w-full bg-light_bg min-h-screen dark:bg-dark_bg dark:text-grey_dark'>
		{
			!user &&(
				<div className='w-full h-screen flex items-center justify-center dark:bg-dark_bg'>
					<Loader/>
				</div>
			)
		}
				{
			user &&(
				<>		<div className='w-full py-2 min-h-[150px] bg-accent text-light_bg  grid sm:grid-cols-2'>
			<div>
				<div className='flex flex-row gap-4 items-center'>
					
					<img src={user?.profile} className='w-[60px] h-[60px] sm:w-[60px] sm:h-[60px] rounded-[100vh] object-cover mx-4 my-2' alt="" />
					<div>
					<h1 className='font-bold text-xl sm:text-4xl my-2'>{user?.name}</h1>
					<div className='flex w-full items-center gap-4'>
						<span className='text-sm font-thin text-grey_dark '>{user?.followers} followers</span>
						<span className='text-sm font-thin text-grey_dark '>{post?.length} posts</span>
					</div>
					</div>
				</div>
			</div>
			<div className='flex items-center justify-center'>
				<button onClick={()=>navigate('/')} className='mx-2 border border-light_bg text-grey_dark text-sm hover:bg-light_bg hover:text-primary font-bold p-2 rounded-md hover:text-primar'><FontAwesomeIcon icon={faHome}/> back home</button>
				<button onClick={()=>request.edit_user("manage-followers",payload)} className='mx-2 border border-light_bg text-grey_dark text-sm hover:bg-light_bg hover:text-primary font-bold p-2 rounded-md hover:text-primar'>follow</button>
			</div>
		</div>
		<Banner isGlobal={true}/>
		{post && (
      <>
        <div className='md:w-[60%] md:ml-[20%] md:shadow-md min-h-screen dark:bg-dark_bg dark:text-grey_dark'>
          {
            post?.map(userpost=>(
				<>
				<Post key={userpost.id} userpost={userpost}/>
				{
              userpost.id %6 === 0 && (
                <Inbuilt isGlobal={true}/>
              )
             }
				</>
              
			 
            ))
          }
          
        </div>
		</>
		)}
				</>
			)
		}

	</div>
  )
}

export default Userprofile