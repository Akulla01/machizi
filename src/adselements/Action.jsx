import React, { useEffect, useState } from 'react'
import Basic from '../modules/basic'
import Adrequest from '../modules/ad_request';
import { toast } from 'react-toastify';
import Update from './Update';

function Action({data}) {
const basic = new Basic();	
const ad_request = new Adrequest();
const[ad,setAd] = useState(null);
const [showedit,setShowedit] = useState(false);


// deletion of advertisement
function handle_delete(id){
	var confirm_delete = confirm(`do you want to delete ${id}`);
	if(confirm_delete){
		var object ={id:id};
		ad_request.publish_ad("delete-ad",object);
	}else{
		toast.success("ad not deleted");
	}
}


  return (
	<div className='overflow-x-scroll'>
		{showedit&&(
		<Update
		close ={setShowedit}
		ad_value ={ad}
		/>	
		)}
		
		<table className='my-10 mx-4 w-[90%]'>
			<thead>
				<tr>
					<td className='font-bold mx-4 text-primary '>image</td>
					<td className='font-bold mx-4 text-primary '>description</td>
					<td className='font-bold mx-4 text-primary '>tags</td>
					<td className='font-bold mx-4 text-primary '>type</td>
					<td className='font-bold mx-4 text-primary '>expired</td>
					<td className='font-bold mx-4 text-primary '>global</td>
					<td className='font-bold mx-4 text-primary '>link</td>
					<td className='font-bold mx-4 text-primary '>action</td>
				</tr>
			
			</thead>
			<tbody>
				{
					data?.map(ads =>(
					<tr key={ads.id} className='shadow-md'>
					<td className='text-sm p-2 '><img src={ads.ad_media} className='w-[50px] h-[50px] bg-grey_light dark:bg-grey_dark object-cover'/></td>
					<td className='text-sm p-2 '>{basic.truncate(ads.ad_heading)}</td>
					<td className='text-sm p-2 '>{ads.ad_tags}</td>
					<td className='text-sm p-2 '>{ads.ad_type}</td>
					<td className='text-sm p-2 '>{ads.expired?"true":"false"}</td>
					<td className='text-sm p-2 '>{ads.global== "1" ? "true":"false"}</td>
					<td className='text-sm p-2 '><a href={ads.link}>{ads.link}</a></td>
					<td className='text-sm p-2 '>
						<div className='flex flex-col gap-2 items-center justify-center'>
							<button className='w-full h-full border rounded hover:bg-primary hover:border-none'
							onClick={()=>{
								setAd(ads);
								setShowedit(true);
							}}
							>edit</button>
							{/* you can use a function of the ad if it satify your use case eg publish satfyies delete */}
							<button className='w-full h-full border rounded hover:bg-primary hover:border-none' onClick={()=>handle_delete(ads.id)}>delete</button>
						</div>
					</td>
				</tr>	
					))
				}
				
			
			</tbody>
		</table>
	</div>
	
  )
}

export default Action