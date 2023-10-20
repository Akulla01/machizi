import React from 'react'
import '../custom_styles/circular_loader.css';

function Loader() {
  return (
	<div id='loader_circular' className='w-[20px] rounded-[100vh] h-[20px] border-4  border-grey_dark'>
	</div>
  )
}

export default Loader