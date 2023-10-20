import React from "react";
import { useNavigate } from "react-router-dom";



class Basic {
	constructor(){
		var theme = localStorage.getItem('theme');
		const navigate = useNavigate();
		this.navigate = navigate;
		this.theme = theme ? theme : 'dark';
	}
	redirect_to_profile(username,user_id){
		window.location.href=`/user-profile/${username}/${user_id}`;
	}
	// redirect to home
	home(){
		this.navigate("/");
	}
	
	basic_reload(){
		window.location.reload();
	}
	
	change_theme(){
		if( this.theme =='light'){
			this.theme ='dark';	
			document.documentElement.classList.remove('light');
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme',"dark");

		}else{
			this.theme = 'light';			
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.add('light');
			localStorage.setItem('theme',"light");
		}
	}
}

export default Basic;