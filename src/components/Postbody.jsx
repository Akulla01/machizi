import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import Loader from '../loaders/Loader';
import Video from '../modules/video';
import Videoinfo from './Videoinfo';


function Postbody({type,url,id}) {
	
	var videoRef = useRef();
	const [playing,setPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [showInfo,setshowInfo] = useState(false);
	const video_manipulator = new Video();

	
	useEffect(() => {
		
		// meaning if its a video file
		if(type==1){
			const video = videoRef.current;
	
		// Update the duration and add a timeupdate event listener
		video.addEventListener('loadedmetadata', () => {
		  setDuration(video.duration);
		});
	
		video.addEventListener('timeupdate', () => {
		  setCurrentTime(video.currentTime);
		});
		// Remove event listeners when component unmounts
		return () => {
		  video.removeEventListener('loadedmetadata', () => {});
		  video.removeEventListener('timeupdate', () => {});
		};	
		}else{
			return;
		}
	
	  }, []);
	  
	  window.addEventListener("scroll",()=>{
		videoRef.current?.pause();
		setPlaying(false);
	  })
	
	// play video
	function play_video(){
		videoRef.current?.play();
		
		setPlaying(true);
	}
	
	function pause_video (){
		videoRef.current?.pause();
		setPlaying(false);
	}
	
	
	function handleSeek(e) {
		const newTime = e.target.value;
		videoRef.current.currentTime = newTime;
		setCurrentTime(newTime);
	  }
	
  return (
	<>
	{type && (
	<div className='w-full min-h-0 object-cover  mb-4'>
		
		{/* 
		1=>media type for image
		0=>media type for video 
		null=>no media at all
		 */}
		{type==2 &&(
		<img src={url} className='w-full mx-0 sm:w-[95%] sm:mx-4 h-[400px] object-cover border-none outline-none' alt="" />	
		)}
		
		{(!url && url !=null) ? <Loader/> :null}
		
		{type==1&&(
		<div className={`w-full h-[300px] object-cover   mb-4 relative`}>
			<video ref={videoRef} id='video_player' src={url} className='w-full h-full border-none outline-none bg-grey_light dark:bg-dark_overlay'></video>
			{!playing && (
			<div onClick={()=> playing ? pause_video() : play_video()} className='absolute top-[40%] left-[40%] text-grey_dark bg-primary w-[60px] h-[60px] flex items-center justify-center text-xl cursor-pointer rounded-[100vh] '><FontAwesomeIcon icon={faPlay}/></div>
							
			)}
			{showInfo &&(
			<Videoinfo
			 id={id}
			 url={url}
			  duration={Math.ceil(duration)}/>	
			)}
			
			{/* down controls */}
			{
				url && (
			<div className='absolute bottom-2 w-full sm:w-[90%] sm:mx-10 bg-transparent flex items-center text-grey_dark hover:bg-overlay h-[40px] rounded-sm hover:text-grey_light dark:hover:bg-dark_overlay dark:hover:text-grey_dark'>
				<span onClick={()=> playing ? pause_video() : play_video()} className=' mx-4 px-2 rounded  cursor-pointer'><FontAwesomeIcon icon={!playing ? faPlay : faPause}/></span>
				<input type="range"
				value={currentTime}
				 className="w-[80%] accent-primary border-none" 
				 min={0}
				 max={duration||0}
				 onChange={handleSeek}
				 />
				<span className='mx-2 rounded  cursor-pointer'><FontAwesomeIcon icon={faInfo} onClick={()=>setshowInfo(!showInfo)}/></span>
				<span className='text-[8px] sm:text-[10px] w-[100px] hover:bg-light_bg dark:hover:bg-dark_bg rounded-md p-1 cursor-pointer font-bold'>{Math.ceil(currentTime)} : {Math.ceil(duration)}sec</span>
			</div>					
				)
			}

		</div>	
			
		)}
		
	</div>	
	)}
	</>
	
  )
}

export default Postbody