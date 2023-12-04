import React, { useEffect, useState } from 'react'
import Loader from '../loaders/Loader'
import Homenav from '../components/Homenav'
import Post from '../components/Post'
import Post_handler from '../modules/post_db'
import Infinite from '../modules/infinite'
import Followercomponent from '../components/Followercomponent'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Banner from '../adselements/Banner'
import Inbuilt from '../adselements/Inbuilt'
import Offline from '../components/Offline'
import Online from '../components/Online'
import logo from "../assets/logo_with_bg.png";

function Home() {
  const post_request = new Post_handler();
  const [posts,setPost] = useState(null);
  const [rec_posts,setrec_post] = useState(null);
  const [rec_newpost,setrec_newpost] = useState([]);
  const[hidewallet,sethidewallet] = useState(localStorage.getItem("hidewallet"));
  const [perpage,setPerpage] = useState(10);
  const[view_non_following,setview_non_following] = useState(false);
  const [newpost,setNewpost] = useState([]);
  const theme = localStorage.getItem('theme');
  const [reloads,setReloads] = useState(false);
  const [isOnline,setisOnline] = useState(true);
  
  
  useEffect(()=>{
    setNewpost(posts ?posts.slice(0,perpage):null);
  },[posts]);
  // reccomemded post
  function automatically_reccommend(){
    if(rec_newpost?.length ==0){
      setview_non_following(true);
    }
  }
  

  
  useEffect(()=>{
    setrec_newpost(rec_posts ?rec_posts.slice(0,perpage):null);
    automatically_reccommend();
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
    if(!hidewallet){
      localStorage.setItem("hidewallet","true");
      sethidewallet(true);
    }
  }
  
  // if the user is online
  const networkStatus = () =>{
    if(navigator.onLine){
     setisOnline(true);     
    }else{
      setisOnline(false);
    }
  }

  
  useEffect(()=>{
    post_request.retrieve_post(setPost);
    post_request.retrieve_reccommeded_post(setrec_post);
    window.addEventListener('scroll',handle_infinite);
    window.addEventListener('online',networkStatus);
    window.addEventListener('offline',networkStatus);
    window.addEventListener('load',networkStatus);
    var reload = setTimeout(()=>{
      setReloads(true);
    },10000);
    
    return ()=>{
      window.removeEventListener('scroll',handle_infinite);
      window.addEventListener('offline',networkStatus);
      window.addEventListener('online',networkStatus);
      window.removeEventListener('load',networkStatus);
      clearTimeout(reload);
    }
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
        {
          reloads && (
            <button className='w-[150px] bg-primary h-[40px] rounded my-4 text-grey_dark' onClick={()=>window.location.reload()}>reload</button>
          )
        }
        
      </div> 
       
      </div>    
    )}
    
    {posts && (
      <>
      <div className='fixed top-[-10px] w-full h-[60px] z-10 bg-light_bg dark:bg-dark_bg dark:shadow'>
             <Homenav/> 
             {!hidewallet && (
             <div className='w-full min-h-[40px] flex items-center bg-primary justify-center flex-col py-2 text-sm md:text-md p-1'>
          <h3>🎉 activate your wallet today  <a className='underline' href="my-wallet">click here</a></h3>
          <span className='my-2 sm:w-[60%]'>wallet will allow you to access premeium features that are being released soon.activate today for minimum  10/= only</span>
          <p className='my-4 animate-pulse'>scroll to hide</p>
		      </div>              
             )}

      </div>

        <div className='w-full m-0 md:w-[75%] md:ml-[15%] min-h-screen mb-0 dark:bg-dark_bg dark:shadow'>
          <Followercomponent/>
          {/* reccommeded post first */}
          {/* banner ads to be displayed here*/}
          {/* <Banner
          isGlobal={false}
            /> */}

            
          {
            rec_newpost?.length !== 0 &&(
             <h3 className='text-md dark:text-light_bg my-4 text-primary font-bold mx-4 sm:mx-[5%]'>from your following</h3> 
            )
          }
          {/* if the user is offline then show him this */}
          {!isOnline && (
            <Offline/>
          )}
          {isOnline && (
            <Online/>
          )}
          {
            rec_newpost?.map(userpost=>(
              <>
             <Post key={userpost.id} id={userpost.user_id}  userpost={userpost}/> 
{/*              {
              userpost.id %6 === 0 && (
                <Inbuilt isGlobal={false}/>
              )
             } */}
             </>
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
              <>
             <Post key={userpost.id} id={userpost.user_id} userpost={userpost}/> 
             {/* {
              userpost.id % 6 == 0 && (
                // if the add is going to be shown everywhere then is global is set to true
                // if its going to be shown on the homepage only then isglobal is false
                <Inbuilt isGlobal={true} />
              )
             } */}
             </>
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