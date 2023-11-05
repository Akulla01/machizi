import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon, faSearch, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';
import Searchfollower from './Searchfollower';
import Notificationcomponent from './Notificationcomponent';
import Basic from '../modules/basic';

export default function Homenav() {
	const [showDrop,setshowDrop] = useState(false);
	const [showSearch,setshowSearch] = useState(false);
	const basic = new Basic();
	const [search_param,setsearch_param] = useState('');
	const [shownotification,setShownotification] = useState(false);
	const [isNew,setisNew] = useState(false);
	const dropref = useRef();
	
	// if user click outside the pop up
	const handleOutsideClick = (e) => {
		if (dropref.current && !dropref.current.contains(e.target)) {
		  setshowDrop(false);
		}
	  };
	useEffect(()=>{
		/* some endpoints may be used more than twice if they satisfy the required use case
		so this endpoint is not only used to edit user but can be used to fetch notification too
		 */
		document.addEventListener('click', handleOutsideClick)
		return ()=>document.removeEventListener('click', handleOutsideClick);
	},[]);

	
  return (
	<div className='dark:bg-dark_bg dark:text-grey_dark w-full h-[60px] shadow-sm mb-10 flex items-center justify-between'>
		<div onClick={()=>basic.home()} className='flex gap-2 items-center'>
			<h1 className=' font-roboto font-bold ml-1 sm:mx-2 text-xl sm:text-3xl cursor-pointer text-primary hover:text-accent'>machizi</h1>
			{
				!showSearch && (
				<span className='text-[10px]'>beta</span>	
				)
			}
			
		</div>
		<div className='h-full flex items-center'>
			<ul className='flex flex-row mr-2 gap-4 text-grey_light font-bold dark:text-grey_dark '>
				<li className='mr-4 relative'>
					<input onChange={(e)=>setsearch_param(e.target.value)}  type="text" className={`border-none outline-none rounded dark:bg-dark_overlay w-full  h-[35px] bg-grey_light px-2 mt-2 text-light_bg mx-4 ${!showSearch && 'hidden'}`} placeholder='search users...' />
						
						<div className={`${!showSearch && 'hidden'} absolute w-[250px] top-10 z-10 right-0`}>
							
							<Searchfollower search_param={search_param} show={setshowSearch}/>
						</div>
						
				</li>
				{
					!showSearch && (
						<>
						<li>
					<span onClick={()=>setshowSearch(!showSearch)} className='dark:bg-dark_overlay text-[12px] sm:text-md bg-grey_dark flex items-center gap-2 hover:bg-grey_dark p-2 rounded-[100vh] sm:bg-transparent cursor-pointer active:bg-primary hover:dark:bg-dark_overlay active:text-light_bg '><FontAwesomeIcon icon={faSearch}/> <span className='hidden sm:block'>search</span></span>
					</li>
					<li>				
					<span className={`text-[12px] sm:text-md bg-grey_dark dark:bg-dark_overlay hover:dark:bg-dark_overlay flex items-center gap-2 hover:bg-grey_dark p-2 cursor-pointer sm:bg-transparent  rounded-2xl active:bg-primary active:text-light_bg
					${isNew && 'animate-pulse  text-primary'}
					 `} onClick={()=>setShownotification(!shownotification)}><FontAwesomeIcon icon={faBell}/> <span className='hidden sm:block'>notification</span></span>
					<div className={`${!shownotification && 'hidden'} absolute w-full sm:w-[400px] top-10 z-10 right-0`}>
							<Notificationcomponent new_setter={setisNew}/>
						</div>
				</li>
				<li>
				<span onClick={()=>basic.change_theme()} className='text-[12px] sm:text-md bg-grey_dark dark:bg-dark_overlay flex items-center gap-2 hover:bg-grey_dark hover:dark:bg-dark_overlay p-2 cursor-pointer sm:bg-transparent  rounded-2xl active:bg-primary active:text-light_bg '><FontAwesomeIcon icon={basic.theme=='light'?faMoon:faSun}/> <span className='hidden sm:block'>switch</span></span>
				</li>
				<li>
				<div ref={dropref}>
				<span onClick={()=>setshowDrop(!showDrop)} className='text-[12px] sm:text-md bg-grey_dark flex items-center gap-2 hover:bg-grey_dark p-2 cursor-pointer dark:bg-dark_overlay sm:bg-transparent  rounded-2xl active:bg-primary active:text-light_bg hover:dark:bg-dark_overlay'><FontAwesomeIcon icon={faUser}/> <span className='hidden sm:block dark:bg-dark_overlay'>account</span></span>
				{showDrop && (
					<Dropdown/>	
				)}
					</div>	
				</li>
						</>
					)
				}	
				
			</ul>
		</div>
	</div>
  )
}
