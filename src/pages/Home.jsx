import React, { useEffect, useState } from 'react'
import Loader from '../loaders/Loader'
import Homenav from '../components/Homenav'
import Post from '../components/Post'
import Post_handler from '../modules/post_db'
import Infinite from '../modules/infinite'
import Followercomponent from '../components/Followercomponent'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const post_request = new Post_handler();
  const [posts,setPost] = useState(null);
  const [rec_posts,setrec_post] = useState(null);
  const [rec_newpost,setrec_newpost] = useState([]);
  const [perpage,setPerpage] = useState(10);
  const[view_non_following,setview_non_following] = useState(false);
  const [newpost,setNewpost] = useState([]);
  const theme = localStorage.getItem('theme');
  
  useEffect(()=>{
    setNewpost(posts ?posts.slice(0,perpage):null);
  },[posts]);
  // reccomemded post
  useEffect(()=>{
    setrec_newpost(rec_posts ?rec_posts.slice(0,perpage):null);
  },[rec_posts]);
  useEffect(()=>{
    setNewpost(posts ?posts.slice(0,perpage):null);
    setrec_newpost(rec_posts ?rec_posts.slice(0,perpage):null);
  },[perpage]);
  const infinite = new Infinite();
  
  const handle_infinite = () =>{
    if(infinite.reachedBottom()){
      setPerpage(prev =>(prev+1));
    }
  }
  
  useEffect(()=>{
    post_request.retrieve_post(setPost);
    post_request.retrieve_reccommeded_post(setrec_post);
    window.addEventListener('scroll',handle_infinite);
    return ()=>window.removeEventListener('scroll',handle_infinite);
  },[]);
  return (
	<div div className='w-full min-h-screen bg-light_bg dark:bg-dark_bg overflow-x-clip'>
    <ToastContainer theme={theme}/>
    {!posts && (
      <div className='w-full min-h-screen bg-light_bg flex items-center justify-center dark:bg-dark_bg'>
      <div className='min-w-[100px] max-w-[250px]  h-[200px] bg-light_overlay text-grey_dark dark:bg-dark_overlay border-none rounded-md p-4 flex justify-center flex-col items-center'>
        <h1 className='font-bold text-xl  text-primary'>Machizi</h1>
        <h3 className='text-[14px]'>More connected,more fun</h3>
        <br />
        <Loader/>
      </div> 
      </div>    
    )}
    
    {posts && (
      <>
      <div className='fixed top-[-10px] w-full h-[60px] z-10 bg-light_bg dark:bg-dark_bg dark:shadow'>
             <Homenav/> 
      </div>

        <div className='w-full m-0 md:w-[75%] md:ml-[15%] min-h-screen mb-0 dark:bg-dark_bg dark:shadow'>
          <Followercomponent/>
          {/* reccommeded post first */}
          {
            rec_newpost &&(
             <h3 className='text-md dark:text-light_bg my-4 text-primary font-bold mx-4 sm:mx-[5%]'>from your following</h3> 
            )
          }
          
          {
            rec_newpost?.map(userpost=>(
             <Post key={userpost.id} id={userpost.id} userpost={userpost}/> 
            ))
          }
          
          {
            !view_non_following && (
            <button className='w-[40%] h-[40px] bg-primary border-none text-light_bg my-4 mx-[30%]' onClick={()=>setview_non_following(!view_non_following)}>
              view post from people you are not following
            </button>  
            ) 
          }

          
          {
            view_non_following && (
              <>
          <h3 className='text-md dark:text-light_bg my-4 text-primary font-bold mx-4 sm:mx-[5%]'>reccomemded posts</h3>
          {
            newpost?.map(userpost=>(
             <Post key={userpost.id} id={userpost.user_id} userpost={userpost}/> 
            ))
          }              
              </>
            )
          }

          
        </div>
        </>
    )}
    </div>
    
  )
}

export default Home