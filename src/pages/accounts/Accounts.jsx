import React, { useState } from 'react'
import Signin from '../../components/Signin';
import Login from '../../components/Login';
import 'react-toastify/dist/ReactToastify.css';
import Banner from '../../adselements/Banner';


function Accounts() {
	const [type,setType] = useState(false);
  return (
	<div className='w-full h-[1000px] overflow-clip bg-background text-grey_light dark:text-grey_dark'>
	<div className='w-full sm:w-[400px] min-h-[100px] shadow-2xl rounded-md absolute top-0 sm:left-[30%] z-10 bg-overlay dark:bg-dark_overlay text-grey_light dark:text-grey_dark'>
		<button onClick={()=>setType(!type)} className='w-[100px] text-sm mb-10 border hover:text-white h-[40px]'>{type ? 'Log in': 'Sign in'}</button>
		{
			type ? <Signin/> : <Login/>
		}
		<a href="/" className='underline mx-4'>back home</a>
		<Banner isGlobal={false}/>
	</div>
	</div>
  )
}

export default Accounts