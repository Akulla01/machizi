import { toast } from "react-toastify";
import axios_http from "./axios_http";
import useToken from "./useToken";

// this is where all the requuest concerning the user is posts etc
class Post_handler {
	constructor(){	
		const {decrypted,encrypt_token,is_token} = useToken();
		/* where __UUTKM__ is user token and should be used for every request that require token validation */
		this.userToken = decrypted;
		this.hasToken = is_token;
		this.encrypt_token = encrypt_token;
	}
	 
	//  retrieve all post => this function should only retrieve all the post and nothing else
	/* THIS IS A SPECIAL FUNCTION BECAUSE IT  HANDLE ONLY ONE REQUEST AND THAT SHOULD BE ACCEPTED */
	async retrieve_post(setter){
		var response;
	 try {
		 response = await axios_http.get('retrieve-post');
		if(response.data.success){
			/* If the post have been retrieved successfully there is a message and 
			data property where data are the posts.
			 */
			setter(response.data.data);
		}else{
		setter(null);
		}
	 } catch (error) {
		/* 
		if there was an error in retrieving the
		 post from the database then
		  */
		toast.error("error in retieving post");
	 }}
	 
	//  reccomemded post
	async retrieve_reccommeded_post(setter){
		if(this.hasToken){
		var response;
	 try {
		 response = await axios_http.get('post-recommendation',{
			headers: {
				'Authorization': `Bearer ${this.userToken}`
			  }
		 });
		if(response.data.success){
			/* If the post have been retrieved successfully there is a message and 
			data property where data are the posts.
			 */
			setter(response.data.data);
		}else{
			console.log(response);
		setter(null);
		}
	 } catch (error) {
		console.log("there was an error");	
	 }			
		}else{
			setter(null);
		}
		
		

	}
	 
	 
	 
	//  send request to the protected routes in the api
	/* here one need to have logged in and has a token which will be used in validating the 
	the user 
	THIS ENDPOINT IS DESIGNED TO HANDLE REQUEST THAT ARE SENDING OBJECT DATA AND EXPECTING MESSAGE 
	ONLY IN RETURN IF YOU ARE EXPECTING OTHER DATA EG: ARRAY OF POST THEN THIS METHOD IS A NO FOR YOU
	 */
	 async post_with_token(path,object,setter){
		if(this.hasToken){
		var response;
	 try {
		 response = await axios_http.post(path,object,{
			headers: {
				'Authorization': `Bearer ${this.userToken}`
			  }
		 });
		if(response.data.success){
			toast.success(response.data.message);
			if(setter){
				setter(prev=>({
					...prev,
					response:true
				}));
			}
		}else{
			toast.error(response.data.message);
			if(setter){
				setter(prev=>({
					...prev,
					response:false
				}));
			}
		}
	 } catch (error) {
		toast.error("there was an error");
		if(setter){
			setter(prev=>({
				
				response:false
			}));
		}
	 }
	}else{
		/* if the user does not have a token and is trying to send request then he 
		will be redirected to the accounts page so that he can create his/her account */
		window.location.href="/accounts";
	}
	}
}

export default Post_handler;