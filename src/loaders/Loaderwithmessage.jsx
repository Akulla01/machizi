import React from 'react'
import Loader from './Loader'

function Loaderwithmessage({message,filewarn}) {
  return (
	<div className='absolute top-0  z-50 left-0 bg-grey_dark dark:text-grey_dark dark:bg-dark_bg flex items-center justify-center flex-col w-full min-h-screen'>
	<Loader/>
	<span>{message}</span>
	<br />
	<span className='text-primary my-2 text-sm'>{filewarn}</span>

</div>
  )
}

export default Loaderwithmessage