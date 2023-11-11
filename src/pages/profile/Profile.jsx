import React, { useEffect, useState } from 'react'
import User from '../../modules/user_db'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faExclamation, faHome, faSignOut, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import Post from '../../components/Post';
import { useNavigate } from 'react-router-dom';
import Post_handler from '../../modules/post_db';
import Basicedit from '../../components/Basicedit';
import Passwordedit from '../../components/Passwordedit';
import Profileedit from '../../components/Profileedit';
import Loaderwithmessage from '../../loaders/Loaderwithmessage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reported from '../../components/Reported';
import Banner from '../../adselements/Banner';
import Inbuilt from '../../adselements/Inbuilt';

function Profile() {
	const request = new User();
	const post_request = new Post_handler();
	const [user,setUser] = useState(null);
	const [post,setPost] = useState([]);
	const [perpage,setPerpage] = useState(2);
	const [newpost,setNewpost] = useState(post ? post?.slice(0,perpage) : []);
	const [reported,setReported] = useState([]);
	const [overlay,setOverlay] = useState(false);
	const navigate = useNavigate();
	const theme = localStorage.getItem('theme');
	useEffect(()=>{
		request.get_user(setUser);
		request.edit_user("retrieve-reported-videos",null,setReported);
	},[]);
	useEffect(()=>{
		setNewpost(post?.slice(0,perpage));
	},[perpage])
	useEffect(()=>{
		setPost(user?.user_post);
	},[user]);
  return (
	<div className='w-full bg-light_bg min-h-screen dark:bg-dark_bg z-50'>
		<ToastContainer theme={theme}/>
		{
			overlay &&(
			<div className='dark:bg-dark_bg absolute top-0 left-0 bg- w-full bg-grey_dark min-h-screen'>
				<button className='w-[150px] h-[40px] bg-primary border-none' onClick={()=>setOverlay(!overlay)}>close popup</button>
				<Basicedit name={user?.name} phone={user?.phone} status={user?.status}/>
				<Passwordedit/>
				<Profileedit profile={user?.profile}/>
		</div>	
			)
		}
		
		{!user&&(
			<Loaderwithmessage message="loading profile.."/>
		)}
		
		<div className='w-full py-2 min-h-[150px] dark:bg-dark_bg bg-light_bg shadow-xl text-grey_light  grid md:grid-cols-2 '>
			<div>
				<div className='flex flex-row gap-1 items-start sm:items-center my-4 text-grey_light '>
					
					<img src={user?.profile} className=' w-[60px] h-[60px] sm:w-[150px] sm:h-[150px] rounded-[100vh] object-cover mx-4 my-2' alt="" />
					<div>
					<h1 className='font-bold text-xl md:text-4xl my-2 dark:text-grey_dark text-grey_light '>{user?.name}</h1>
					<div className='flex w-full items-center gap-4'>
						<span className='text-sm font-thin dark:text-grey_dark text-grey_light'>{user?.followers} followers</span>
						<span className='text-sm font-thin dark:text-grey_dark text-grey_light '>{post?.length} posts</span>
					</div>
					
					<p className='text-md  dark:text-grey_dark text-grey_light '>{user?.phone}</p>	
					<p className='text-[10px] sm:text-md  dark:text-grey_dark text-grey_light '>{user?.email}</p>
					<p className='text-[10px] hidden sm:block dark:text-grey_dark text-grey_light'>Your user information is only visible to you only</p>
					</div>
				</div>
			</div>
			<div className='flex items-center justify-center'>
				<button onClick={()=>setOverlay(true)} className='mx-2 border border-light_bg dark:text-grey_dark text-grey_light text-sm hover:bg-light_bg hover:text-primary font-bold p-2 rounded-md hover:text-primar'><FontAwesomeIcon icon={faEdit}/>  <span className='hidden sm:block'>edit profile</span></button>
				<button onClick={()=>window.location.href='/create-post'} className='mx-2 border border-light_bg dark:text-grey_dark text-grey_light text-sm hover:bg-light_bg hover:text-primary font-bold p-2 rounded-md hover:text-primar'><FontAwesomeIcon icon={faUpload}/> <span>create post</span></button>
				<button onClick={()=>navigate('/')} className='mx-2 border border-light_bg dark:text-grey_dark text-grey_light text-sm hover:bg-light_bg hover:text-primary font-bold p-2 rounded-md hover:text-primar'><FontAwesomeIcon icon={faHome}/> <span className='hidden sm:block'>back home</span> </button>
	<button onClick={()=>window.location.href='/accounts'} className='mx-2 border border-light_bg dark:text-grey_dark text-grey_light text-sm hover:bg-light_bg hover:text-primary font-bold p-2 rounded-md hover:text-primar'><FontAwesomeIcon  icon={faSignOut}/> <span className='hidden sm:block'>switch account</span></button>
			</div>
		</div>
		
		{/* if the user content has not been reported there is no need to show the user this
		dialog  for reported */}
		{
			reported !== null || reported.length !== 0 && (
				<Reported reported={reported}/>
			)
		}
		{/* <Banner isGlobal={true}/> */}
		{reported.length !== 0 &&(
		<center><button onClick={
			()=>window.location.href ="reports"
		} className='bg-primary w-[150px] h-[40px] text-light_bg p-2'>recent reportings</button></center>			
		)}

		{post && (
      <>
        <div className='md:w-[60%] md:ml-[20%] md:shadow-md min-h-screen'>
          {
            newpost?.map(userpost=>(
				<>
				<Post key={userpost.id} id={userpost.user_id} userpost={userpost}/>
				<div>
				<button onClick={()=>post_request.post_with_token('delete-post',{post_id:userpost.id})} className='active:bg-accent w-[100px] mx-20 h-[40px] bg-primary dark:text-grey_dark text-grey_light'><FontAwesomeIcon icon={faTrash}/> delete post</button>
				</div>
				{/* {
              userpost.id %6 === 0 && (
                <Inbuilt isGlobal={true}/>
              )
             } */}
				</>
              
			 
            ))
          }
		  {
			perpage < post.length &&(
          <button onClick={()=>setPerpage(prev =>(prev+=1))} className='w-full h-[40px] bg-accent mt-4 text-grey_dark'>load more posts</button>				
			)
		  }
		  
		  {
			 post.length < 3 &&(
				<div className='w-[200px] flex-col min-h-[200px] sm:mx-[40%] my-10 shadow-md flex items-center justify-center'>
					<FontAwesomeIcon className='text-4xl bg-grey_light text-light_bg w-[60px] h-[60px] rounded-[100vh] dark:bg-dark_overlay dark:text-grey_dark' icon={faExclamation}/>
					<span className='dark:text-grey_dark my-4'>create more post</span>
					<a href="/create-post" className='text-primary underline'>create post</a>
				</div>
			)
		  }
        </div>
		</>
		)}
	</div>
  )
}

export default Profile