import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag,faClock,faDownload } from '@fortawesome/free-solid-svg-icons';
import User from '../modules/user_db';
import Video from '../modules/video';
import { ToastContainer, toast } from 'react-toastify';

function Videoinfo({duration,id,url}) {
	const [showReport,setshowReport] = useState(false);
	const request = new User();
	const video_manipulator = new Video();
	const [report_details,setreport_details] =useState({
		id:id,
		issue:''
	});
	
	const report = () =>{
		request.edit_user("report-video",report_details,null);
	}
	
  return (
	<div className={`w-[150px] min-h-[10px] absolute bottom-[20%] z-10 right-10 bg-grey_dark
	${showReport?'w-[200px] min-h-[200px] pb-2 right-20':null}
	 dark:bg-dark_bg`}>
		<ToastContainer/>
		
		{
			showReport&&(
				<>
				<div>
				<div className='w-full h-[30px] text-grey_dark bg-primary flex items-center justify-center text-sm'>report issue</div>
				<span className='text-dark_grey dark:text-light_bg text-sm ml-2'>wrong accusation will lead to banning of your account</span>
					<textarea
					onChange={(e)=>setreport_details(prev=>({
						...prev,
						issue:e.target.value
					}))}
					placeholder='your issue..'
					className='w-[90%] mx-2  p-2 my-2 h-[80px] bg-light_overlay text-grey_light dark:bg-dark_overlay dark:text-light_bg'
					></textarea>
					<div className='w-full flex items-center justify-center text-grey_dark'>
						<button onClick={()=>setshowReport(false)}  className=' border p-2 rounded mx-2'>close</button>
						<button className=' bg-primary p-2 rounded mx-2 w-[100px]' onClick={report}>send</button>
					</div>
				</div>
				</>
			)
		}
		{
			!showReport &&(
				<>
		<div className='w-full h-[30px] text-grey_dark bg-primary flex items-center justify-center text-sm'>video info</div>
		<div className='w-full flex flex-col gap-2 dark:text-light_bg text-sm mx-2 my-2'>
		<span className='cursor-none'> <FontAwesomeIcon icon={faClock}/> &nbsp;duration:{duration} secs</span>
		<a  onClick={()=>toast.info("this video cannot be downloaded right now")}   className='cursor-pointer'><FontAwesomeIcon icon={faDownload} onClick={()=>toast.success("you need to be a premium member")}/> &nbsp;download</a>
		<span  className='cursor-pointer' onClick={()=>setshowReport(true)}> <FontAwesomeIcon icon={faFlag}/> &nbsp;report video</span>	
		</div>				
				</>
			)
		}


	</div>
  )
}

export default Videoinfo