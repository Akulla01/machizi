import React from 'react'
import logo from "../../assets/logo.png";
import Basic from "../../modules/basic";

function Terms() {
	
	const basic = new Basic();
  return (
	<div className='w-full text-grey_light
	 dark:text-grey_dark min-h-screen bg-light_bg dark:bg-dark_bg'>
		<div className='w-full h-[40px] shadow-sm flex items-center '>
			<ul className='w-full h-full flex flex-col sm:flex-row items-center justify-center sm:justify-around cursor-pointer ' onClick={()=>basic.home()}>
				<li className='font-bold flex gap-4 items-center justify-center mt-4'>
					<img src={logo} className='w-[50px] h-[50px] rounded-lg'/>
					<h1>Machizi</h1>
				</li>
				<li className='flex gap-2'>
					<span className='hover:cursor-pointer hover:text-primary' onClick={()=>basic.home()}>home</span>
					<span className='hover:cursor-pointer hover:text-primary' onClick={()=>basic.redirect_user("accounts")}>accounts</span>
					<span className='hover:cursor-pointer hover:text-primary' onClick={()=>basic.redirect_user("create-post")}>create post</span>
					<span className='hover:cursor-pointer hover:text-primary' onClick={()=>basic.redirect_user("profile")}>profile</span>
				</li>
			</ul>
		</div>
		<br /><br /><br />
		<div >
			<h1 className='sm:w-[90%] sm:mx-[10%] my-4  text-2xl '>Introduction</h1>
			<div className='sm:w-[70%] sm:mx-[10%] my-4  '>
				<h3 className='font-bold text-md text-primary my-2'>Who we are</h3>
				<span className='w-3/4 my-4'>Machizi is  an online social media,made in kenya for university students to share and connect with each other.It allows you to know what is happening in your university and friends university.It allows the comrades to communicate with one voice as this will allow them to be 
					heard more effectively.Machizi incoporates the local environment and needs of the comrades.
					In short this is the voice of the comrades in kenya. <i>Comrades power</i>
				</span>
			</div>
			<div className='sm:w-[70%] sm:mx-[10%] my-4  '>
				<h3 className='font-bold text-md text-primary my-2'>Why machizi started.</h3>
				<div>
					<span  className='w-3/4 my-4'>Have you ever wanted to share something with your agemates? with people to you know are going to listen to you more?Tiktok is there but does it really listen to the voice of the comrades in kenya?Does it make product specifically for you.Thats where machizi comes in.To help you to listen to the voice of the comrades.To talk with one voice against challenges facing the comrades.Low employment for the youths and comrades in kenya.This is where the comrades are and this is where our voice as the youths and comrades of kenya will be heard.
					With Machizi,You can Raise your problem and you will not wait for  <b>Elon musk</b> or <b>Mark zuckerberg</b> to adress you ,We are made in kenya for the Kenyan comrades like you and me that is where machizi come to play.To bring and amplify the voice of the comrades.
					</span>
				</div>
			</div>
			
			<div className='sm:w-[70%] sm:mx-[10%] my-4  '>
				<h3 className='font-bold text-md text-primary my-2'>How machizi works</h3>
				<div>
				<span  className='w-3/4 my-4'>Machizi is a simple to use platform.with a few set and clicks your account will be ready and set up ready for you to start your following spree.This is your chance to be famous if you missed it on tiktok.We provide for you that opportunity.</span>
				<br />
				<span>
					You can create your post and follow other people,of course if you become famous on our platform there is a reward but that will come when you meet it 😂.Unafaa kufocus on building your followers.
				</span>
				</div>
			</div>
			
			<div className='sm:w-[70%] sm:mx-[10%] my-4  '>
				<h3 className='font-bold text-md text-primary my-2'>Post regulation and reporting</h3>
				<div>
					<span  className='w-3/4 my-4'>Machizi ni platform yenye ina promote free speech for all.Talk anything you want as long as it is backed by the truth.While that is the case,kuna vitu hatuwezi ruhusu.
						Hizi vitu ni kama kupost <i>mangwati(ponography)</i> hiyo nayo zii.Avoid copyrighting other peoples post because when you are reported utakuwa kwa ngori sana.Your account willbe banned and may suffer a potentiall deletion.
						If you report someone and its found out that the allegations are false then your account may be banned for wrongful accusation.Tusichomeane kwa mabro pia, hii ni site ya macomrade na tupromote hiyo form.ama niaje.
					</span>
				</div>
			</div>
			
			<div className='sm:w-[70%] sm:mx-[10%] my-4 mb-0 '>
				<h3 className='font-bold text-md text-primary my-2'>Data collection</h3>
				<div>
					<span  className='w-3/4 my-4'>We collect your various data including but not limited to 
						<ul className='my-4'>
							<li>phone number - This will be useful when you are making transaction with our app since we use M-pesa as a service</li>
							<li>Email - This will be used to verify you when login in or signing in to your account.</li>
							<li>post you liked</li>
							<li>Your universtity-so that we can customize you post to your audience</li>
							<li>Your gender-so that we can customize you post to your audience</li>
						</ul>
						We collect the above information but not limited to this we do collect also the post you commented on,people you follow.All this to make your experience kama comrade to be top knotch.
					</span>
					
					<i className='mt-4 text-primary'>thank you for supporting us - najua tutagrow pamoja</i>
				</div>
			</div>
			
			
			
			
		</div>
	</div>
  )
}

export default Terms