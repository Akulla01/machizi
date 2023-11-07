import React, { useEffect, useState } from 'react'
import Adrequest from '../modules/ad_request';
import Basic from '../modules/basic';
import Loaderwithmessage from "../loaders/Loaderwithmessage.jsx";

function Publish() {
	const [step,setStep] = useState(4);
	const [image,setImage] = useState(null);
	const basic = new Basic();
	const adrequest = new Adrequest();
	const [show,setShow] = useState(true);
	const [price,setPrice] = useState({
		global:'false',
		ad_type:'',
		duration:'daily',
		plan:'',
		price:0
		
	});
	
	const [ad_details,setad_details] = useState({
		"ad_heading":'',
		"ad_tags":'',
		"ad_type":'',
		"auto_renew":false,
		"ad_expiry":1,
		"global":true,
		"link":import.meta.env.VITE_FRONTEND_URL,
		"ad_media":""
	});
	
	
	function calculate_price(){
		// gold tier banner
		if(ad_details.global && ad_details.ad_type =="banner" && ad_details.ad_expiry ==1){
			setPrice(prev=>({
				global:"true",
				ad_type:'banner',
				duration:"one month",
				plan:'gold tier -banner',
				price:3000
			}));
		}
			// gold tier inbuilt
			if(ad_details.global && ad_details.ad_type =="inbuilt" && ad_details.ad_expiry ==1){
				setPrice(prev=>({
					global:"true",
					ad_type:'inbuilt',
					duration:"one month",
					plan:'gold tier -inbuilt',
					price:6000
				}));
			}
		// platinum tier banner
		if(!ad_details.global && ad_details.ad_type =="banner" && ad_details.ad_expiry ==1){
			setPrice(prev=>({
				global:"false",
				ad_type:'banner',
				duration:"one month",
				plan:'platinum tier -banner',
				price:1500
			}));
		}
		// platinum  tier inbuilt
		if(!ad_details.global && ad_details.ad_type =="inbuilt" && ad_details.ad_expiry ==1){
			setPrice(prev=>({
				global:"false",
				ad_type:'inbuilt',
				duration:"one month",
				plan:'platinum tier -inbuilt',
				price:3000
			}));
		}
			// silver tier banner
			if(ad_details.global && ad_details.ad_type =="banner" && ad_details.ad_expiry == 0){
				setPrice(prev=>({
					global:"true",
					ad_type:'banner',
					duration:"one day",
					plan:'silver tier -banner',
					price:500
				}));
			}
				// silver tier inbuilt
				if(ad_details.global && ad_details.ad_type =="inbuilt" && ad_details.ad_expiry == 0){
					setPrice(prev=>({
						global:"true",
						ad_type:'inbuilt',
						duration:"one day",
						plan:'silver tier -inbuilt',
						price:700
					}));
				}
				
				// basic tier banner
				if(!ad_details.global && ad_details.ad_type =="banner" && ad_details.ad_expiry == 0){
					setPrice(prev=>({
						global:"false",
						ad_type:'banner',
						duration:"one day",
						plan:'basic tier -banner',
						price:150
					}));
				}
				// basic tier inbuilt
				if(!ad_details.global && ad_details.ad_type =="inbuilt" && ad_details.ad_expiry == 0){
					setPrice(prev=>({
						global:"false",
						ad_type:'inbuilt',
						duration:"one day",
						plan:'basic tier -inbuilt',
						price:300
					}));
				}
	}
	
	
	
	
	
	// calculate the cost of the add😂
	useEffect(()=>{
	 if(step == 4){
		calculate_price();
		setTimeout(() => {
			setShow(false);
		}, 3000);
	 }	
	},[step])
	
	 function Publish_ad(){
		var fdata = new FormData();
		fdata.append("ad_tags",ad_details.ad_tags);
		fdata.append("ad_heading",ad_details.ad_heading);
		fdata.append("ad_type",ad_details.ad_type);
		fdata.append("auto_renew",ad_details.auto_renew);
		fdata.append("ad_expiry",ad_details.ad_expiry);
		fdata.append("global",ad_details.global);
		fdata.append("link",ad_details.link);
		fdata.append("ad_media",ad_details.ad_media);
		adrequest.publish_ad("publish-ad",fdata);
	 }
	
	
		// handle image upload
		const handleImageUpload = (e) => {
			e.preventDefault();
			  const selectedImage = e.target.files[0];
			  const imageUrl = URL.createObjectURL(selectedImage);
			  setImage(imageUrl);
			  setad_details(prev=>({
				...prev,
				ad_media:selectedImage
			  }));
		  };
	
  return (
	<div className='w-[60%] h-screen mx-[20%] mt-10'>
		<h1 className='text-2xl text-primary font-bold my-4'>step {step} of 5</h1>
		{
			step == 1 && (
				<div className='flex flex-col'>
					<span className='text-sm my-4'>basic information about your advertisement</span>
					<label htmlFor="ad_heading" className='mt-4 font-bold'>your heading</label>
					<input type="text"
					className='w-[500px] h-[40px] bg-transparent border rounded my-4 focus:border focus:border-primary' 
					onChange={(e)=>setad_details(prev =>({
						...prev,
						"ad_heading":e.target.value
					}))}
					value={ad_details.ad_heading}
					placeholder='enter your ad heading'
					id='ad_heading'
					 />
					 <label htmlFor="ad_type" className='mt-4 font-bold'>type of advertisement</label>
					 <select
					 	className='w-[500px] h-[40px] bg-transparent border rounded my-4 focus:border focus:border-primary'
					onChange={(e)=>setad_details(prev =>({
						...prev,
						"ad_type":e.target.value
					}))}
					value={ad_details.ad_type}
					   id="ad_type">
						<option value="">ad type</option>
						<option value="banner">banner</option>
						<option value="inbuilt">inbuilt</option>
					 </select>
					 <span className='text-sm my-4'>
						Banners are ads that show on the big spaces on the website while inbuilt
						are advertisement that are the same as user post
					 </span>
					 <label htmlFor="ad_tag" className='mt-4 font-bold'>Tags</label>
					 <input 
					 	className='w-[500px] h-[40px] bg-transparent border rounded my-4 focus:border focus:border-primary'
					onChange={(e)=>setad_details(prev =>({
						...prev,
						"ad_tags":e.target.value
					}))}
					value={ad_details.ad_tags}
					 type="text" 
					 placeholder='eg music,games,motivation'
					 id='ad_tag'
					 />
					 <span className='text-sm my-4'>allow us to target users more perfectly to your advertisemen</span>
				</div>	
			)
		}
		
		{/* advertisement details eg auto renew */}
		{step == 2 && (
			<div className='flex flex-col'>
				<h3>Your ad metadata</h3>
				<label htmlFor="ad_expiry" className='mt-4 font-bold'>Expiry of the ad</label>
				<select 
					className='w-[500px] h-[40px] bg-transparent border rounded my-4 focus:border focus:border-primary'
					onChange={(e)=>setad_details(prev =>({
						...prev,
						"ad_expiry":e.target.value
					}))}
					value={ad_details.ad_expiry}
				 id="ad_expiry">
					<option  value={0}>expiry of the ad(default:daily)</option>
					<option value={0}>day (runs for one day)</option>
					<option value={1}>month (run for a month)</option>
				</select>
				<label htmlFor="global" className='mt-4 font-bold'>Enter your ad range</label>
				<select 
					className='w-[500px] h-[40px] bg-transparent border rounded my-4 focus:border focus:border-primary'
					onChange={(e)=>setad_details(prev =>({
						...prev,
						"global":e.target.value
					}))}
					value={ad_details.global}
				 id="global">
					<option  value={true}>default:show across the platform</option>
					<option value={false}>show only on the homepage</option>
				</select>
				<label htmlFor="link" className='mt-4 font-bold'>redirect link</label>
					 <input 
					 type="text" 
					 className='w-[500px] h-[40px] bg-transparent border rounded my-4 focus:border focus:border-primary'
					 onChange={(e)=>setad_details(prev =>({
						...prev,
						"link":e.target.value
					}))}
					value={ad_details.link}
					 placeholder='enter link to your ad destination    format (https://.....) leave blank if no link'
					 id='link'
					 />
				<div>
					<input type="checkbox"
					onChange={(e)=>setad_details(prev =>({
						...prev,
						"auto_renew":e.target.value
					}))}
					 id='auto_renew' 
					 className='accent-primary'
					value={true} />
					<label htmlFor="auto_renew" className='mt-4 font-bold'>auto renew</label>
				</div>
			</div>
		)}
		{/* image upload section */}
		{
		step === 3 && (
			<div className='flex flex-col'>
				<h3>upload your ad image</h3>
				<span>reccommended : banner(800px by 300px) , inbuilt (400px by 500px)</span>
				<label className='my-4 cursor-pointer border-2  p-4 border-dashed' htmlFor="ad_media">
				upload ad media
			</label>
					 <input 
					 className='hidden'
					 onChange={handleImageUpload}
					 type="file" 
					 id='ad_media'
					 />
					 
					 {
				image && (
			<img className='my-4 w-[350px] h-[250px] object-cover' src={image?image:null}/>					
				)
			}
				
			</div>
		)	
		}
		
		{
			step == 4 && (
			 <div className='shadow flex flex-col items-center justify-start my-[20%]'>
				<h3 className='text-3xl text-primary my-2 font-bold'>payment M-pesa</h3>
				
				<div className='w-[300px] h-[60px]  flex shadow-md rounded-md items-center justify-around'>
					<span className='text-xl '>Ad is global</span>
					<span className='text-xl '>{price.global}</span>
				</div>
				<div className='w-[300px] h-[60px]  flex shadow-md rounded-md items-center justify-around'>
					<span className='text-xl '>type of ad</span>
					<span className='text-xl '>{price.ad_type}</span>
				</div>
				<div className='w-[300px] h-[60px]  flex shadow-md rounded-md items-center justify-around'>
					<span className='text-xl '>duration</span>
					<span className='text-xl '>{price.duration}</span>
				</div>
				<div className='w-[300px] h-[60px]  flex shadow-md rounded-md items-center justify-around'>
					<span className='text-xl '>to be deducted</span>
					<span className='text-xl '>ksh.{price.price}</span>
				</div>
				
				<span className='text-primary my-10 font-bold'>Your plan : &nbsp;{price.plan}</span>
					
				{
					show && (
					<Loaderwithmessage message="calculating ad cost cost..."/>	
					)
				}
				
				<div>
					<button className='w-[150px] h-[40px] border hover:bg-accent rounded mx-4' onClick={()=>setStep(prev => (prev > 1 ? prev-=1 : 1))}>previous</button>
					<button className='w-[150px] h-[40px] bg-primary hover:bg-accent rounded mx-4' onClick={()=>{
						Publish_ad();
						setStep(prev => (prev < 5 ? prev+=1 : 5))}}>publish ad</button>
				</div>
			 </div>
			)
		}
		{
			step < 4 && (
				<div>
					<button className='w-[150px] h-[40px] border hover:bg-accent rounded mx-4' onClick={()=>setStep(prev => (prev > 1 ? prev-=1 : 1))}>previous</button>
					<button className='w-[150px] h-[40px] bg-primary hover:bg-accent rounded mx-4' onClick={()=>setStep(prev => (prev < 5 ? prev+=1 : 5))}>next</button>
				</div>
			)
		}
				{
			step == 5 && (
				<div>
					<button className='w-[150px] h-[40px] border hover:bg-accent rounded mx-4' onClick={()=>setStep(prev => (prev > 1 ? prev-=1 : 1))}>back</button>
					<button className='w-[150px] h-[40px] bg-primary hover:bg-accent rounded mx-4' onClick={()=>basic.redirect_user("advertisement")}>dashboard</button>
				</div>
			)
		}
	</div>
  )
}

export default Publish