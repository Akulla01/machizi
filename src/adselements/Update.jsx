import React, { useEffect, useState } from 'react'
import Adrequest from "../modules/ad_request";
import { toast } from 'react-toastify';

function Update({close,ad_value}) {
	const [edit_payload,setedit_payload] = useState(null);
	const adrequest = new Adrequest();
	useEffect(()=>{
		setedit_payload(ad_value);
	},[ad_value]);
	
	
	const handleUpdate = ()=>{
		var confirm_update = confirm("are you sure you want to update");
		if(confirm_update){
			adrequest.publish_ad("update-ad",edit_payload);
		}else{
			toast.success("ad request cancelled");
		}
	}
	
	

  return (
	<div className='bg-light_overlay dark:bg-dark_overlay w-full h-screen absolute flex flex-col'>
		<div className='w-[60%] flex flex-col  mx-10 my-10'>
					<label htmlFor="ad_heading" className='mt-4 font-bold'>enter new heading</label>
		<input type="text"
		 className='w-[500px] h-[40px] bg-transparent border rounded my-4 focus:border focus:border-primary'
		id='ad_heading' 
		onChange={(e)=>setedit_payload(prev=>({
			...prev,
			"ad_heading":e.target.value
		}))}
		value={edit_payload?.ad_heading}
		 />
		<label htmlFor="ad_tags" className='mt-4 font-bold'>enter new tags</label>
		<input type="text"
		value={edit_payload?.ad_tags}
		onChange={(e)=>setedit_payload(prev=>({
			...prev,
			"ad_tags":e.target.value
		}))}
		 className='w-[500px] h-[40px] bg-transparent border rounded my-4 focus:border focus:border-primary'
		 id='ad_tags'  />
		<label htmlFor="link" className='mt-4 font-bold'>change link</label>
		<input type="text"
		value={edit_payload?.link}
				onChange={(e)=>setedit_payload(prev=>({
					...prev,
					"link":e.target.value
				}))}
		
		 className='w-[500px] h-[40px] bg-transparent border rounded my-4 focus:border focus:border-primary'
		id='link' />
		<div>
		<input type="checkbox"
				onChange={(e)=>setedit_payload(prev=>({
					...prev,
					"auto_renew":e.target.value
				}))}
		  className='accent-primary'
		   id='auto_renew'
		   value={edit_payload?.auto_renew == 1?false:true}
		    />
		<label htmlFor="auto_renew" className='mt-4 font-bold'>auto renew (current:{ad_value?.auto_renew == 1?'true':'false'} check to turn into the opposite of current value)</label>
		</div>
		<div className='my-4'>
			<button className='w-[150px] h-[40px] border hover:bg-accent rounded mx-4' onClick={()=>close(false)}>cancel</button>
			<button className='w-[150px] h-[40px] bg-primary hover:bg-accent rounded mx-4' onClick={handleUpdate}>update</button>
		</div>
		
		</div>

		
		
	</div>
  )
}

export default Update