import React from 'react'
import Loader from './Loader'

function Loaderwithmessage({message}) {
  return (
	<div className='absolute top-0 left-0 bg-grey_dark dark:text-grey_dark dark:bg-dark_bg flex items-center justify-center flex-col w-full min-h-screen'>
	<Loader/>
	<span>{message}</span>

</div>
  )
}

export default Loaderwithmessage