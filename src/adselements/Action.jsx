import React, { useEffect } from 'react'
import Basic from '../modules/basic'

function Action({data}) {
const basic = new Basic();	
  return (
	<div className='overflow-x-scroll'>
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
							<button className='w-full h-full border rounded hover:bg-primary hover:border-none'>edit</button>
							<button className='w-full h-full border rounded hover:bg-primary hover:border-none'>delete</button>
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