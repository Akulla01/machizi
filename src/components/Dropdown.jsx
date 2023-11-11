import { faSignIn, faUser,faUpload, faAd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import {Link} from 'react-router-dom';
import useToken from "../modules/useToken";

export default function Dropdown() {
	
	const {delete_token,is_token} = useToken();
  return (
	<div className='absolute top-[90%] z-10 right-0 bg-light_overlay dark:bg-dark_overlay flex flex-col w-[200px] shadow-md'>
		<div className=' w-full h-[40px] bg-primary grid place-content-center text-grey_dark '>dashboard</div>
		<Link className='px-4 my-4 w-[90%]  hover:text-accent  font-bold' to="/profile"> <FontAwesomeIcon icon={faUser}/> go to profile</Link>
		<Link className='px-4 my-4 w-[90%]  hover:text-accent  font-bold' to="/create-post"><FontAwesomeIcon icon={faUpload}/> create post</Link>
		<Link className='px-4 my-4 w-[90%]  hover:text-accent  font-bold' to="/accounts"><FontAwesomeIcon  icon={faSignIn}/> accounts</Link>
		{/* {
			is_token && (
			<Link className='px-4 my-4 w-[90%]  hover:text-accent  font-bold' to="/advertisement"><FontAwesomeIcon  icon={faAd}/> advertisements</Link>	
			)
		} */}
		
		<button className='px-4 my-4 w-[90%]  hover:text-accent  font-bold' onClick={()=>delete_token()} >Log out</button>
	</div>
  )
}
