import React, { useEffect,useRef,useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faExpand, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

function Reported({reported}) {
	var videoRef = useRef();
	const [playing,setPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [show,setShow] = useState(true);
	useEffect(() => {
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
		
	  }, []);
	
	// play video
	function play_video(){
		videoRef.current.play();
		
		setPlaying(true);
	}
	
	function pause_video (source){
		videoRef.current.pause();
		setPlaying(false);
	}
	
	
	function handleSeek(e) {
		const newTime = e.target.value;
		videoRef.current.currentTime = newTime;
		setCurrentTime(newTime);
	  }
  return (
	<div className={`bg-crimson w-full min-h-[250px] mb-10
	${!show && 'hidden'}
	 text-light_bg pb-10 pt-4`}>
		<center><h1 className='text-4xl font-extrabold'>Warning:One or more of your videos have been reported</h1>
		<br /><br />
		<button className='w-[150px] h-[40px] border rounded' onClick={()=>setShow(false)}>close popup</button>
		</center>
		
        <div className='text-grey_dark w-full sm:w-[80%] sm:mx-[10%] my-10 md:w-[60%] md:mx-[20%]'>
		{
			reported?.map(videoreported =>(
				<div key={videoreported.id}>
				<div className='w-full font-roboto dark:text-grey_dark px-1'>
				<div className='w-full flex items-center gap-2  mb-4 cursor-pointer'>
				{!reported?
				<Loader/>
				:
				<img src={videoreported.reporter_profile} className='w-[40px] h-[40px] rounded-[100vh] bg-grey_light object-cover' alt="" />
				}

				<h3 >
				<span className='text-xl text-grey_light font-bold font-roboto flex flex-col dark:text-primary'>{videoreported.reporter_name}</span>
				<span className='text-[12px] text-grey_light  dark:text-grey_dark'> reporter number:  {videoreported.reporter_number}</span>
				</h3>
				</div>
				<div className='w-full min-h-[20px] font-bold text-sm mb-4'>
				<p className='w-[90%] mx-4'>this video has been reported to us and we are in the process of reviewing if it goes against our terms and policy we will remove it from your post within 28 days.The contacts of the reporter have been given above you can contact him to drop his previous reports in the process.</p>
				<br />
				
				<span className='w-[90%] mx-4 font-bold'>reason: {videoreported.issue}</span>
				</div>
				</div>
				{/* start of video */}
				<div className='w-full h-[300px] object-cover   mb-4 relative'>
			<video ref={videoRef} id='video_player' src={videoreported.reported_video} className='w-full h-full border-none outline-none bg-grey_light dark:bg-dark_overlay'></video>
			{!playing && (
			<div onClick={()=> playing ? pause_video() : play_video()} className='absolute top-[40%] left-[40%] text-grey_dark bg-primary w-[60px] h-[60px] flex items-center justify-center text-xl cursor-pointer rounded-[100vh] '><FontAwesomeIcon icon={faPlay}/></div>
							
			)}
			{/* down controls */}
			{
				reported && (
			<div className='absolute bottom-2 w-full sm:w-[90%] sm:mx-10 bg-transparent flex items-center text-grey_dark hover:bg-overlay h-[40px] rounded-sm hover:text-grey_light dark:hover:bg-dark_overlay dark:hover:text-grey_dark'>
				<span onClick={()=> playing ? pause_video() : play_video()} className=' mx-4 px-2 rounded  cursor-pointer'><FontAwesomeIcon icon={!playing ? faPlay : faPause}/></span>
				<input type="range"
				value={currentTime}
				 className="w-[80%] accent-primary border-none" 
				 min={0}
				 max={duration||0}
				 onChange={handleSeek}
				 />
				<a href={videoreported.reported_video}  className=' mx-2  cursor-pointer'><FontAwesomeIcon icon={faExpand}/></a>
				<span className='text-[8px] sm:text-[10px] w-[100px] hover:bg-light_bg dark:hover:bg-dark_bg rounded-md p-1 cursor-pointer font-bold'>{Math.ceil(currentTime)} : {Math.ceil(duration)}sec</span>
			</div>					
				)
			}

		</div>
				</div>
			))
		}	
		</div>
		
	</div>
  )
}

export default Reported