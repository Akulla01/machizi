import React, { useState } from 'react'

function Note() {
	const [closed,setClosed] = useState(false);
	function close_popup(){
		localStorage.setItem("closed","true");
		setClosed(true);
	}
	
  return (
	<div className={`${closed && 'hidden'} w-full bg-crimson text-light_bg flex items-center my-10 p-4 flex-col`}>
		<h1 className='font-bold text-xl mb-4'>Note from the developer</h1>
		<div className='text-sm w-[80%]'>
		Macomrades wote wanajaribu kutoka kwa block but the reality is that ni ngumu.But I know there are
		comrades who are making money  while learning.Lets share how we do it and more on machizi.com .Hakuna haja ukae na idea pekee yako light other people candle.Create account and pia unaeza test your idea and you will be helped.Machizi the website for comrades #Tujijenge Hakuna mwenye atakusaidia kama hutaki kujisaidia so create your account now and start learning and sharing with your fellow comrades TUJIEMPOWER KIVYETU. remember to share with your friends  ndio content ikae most. 🤟✌
			
			<br />
			<button onClick={close_popup} className='cursor-pointer w-[100px] h-[40px] border hover:border-grey_light rounded-md my-4'>close</button>
		</div>
	</div>
  )
}

export default Note