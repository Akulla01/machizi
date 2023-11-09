import { toast } from "react-toastify";
import axios_http from "./axios_http";
import useToken from "./useToken";

// this is where all the requuest concerning the user is store
class User {
	constructor(){	
		const {decrypted,encrypt_token,is_token} = useToken();
		/* where __UUTKM__ is user token and should be used for every request that require token validation */
		this.userToken = decrypted;
		this.hasToken = is_token;
		this.encrypt_token = encrypt_token;
	}
	
	// this handles the log in and sign up function
	/* this should be used for only the log in and signup function since a tocken will 
	be returned and with a false token the user will be unauthenticated if he was once 
	authenticated. */
	async account(path,object){
		var response;
	 try {
		 response = await axios_http.post(path,object);
		if(response.data.success){
			const plainToken = response.data.token;
			this.encrypt_token(plainToken);
			toast.success(response.data.message);
		}else{
			toast.error(response.data.message);
		}
	 } catch (error) {
		toast.error("there is an error");
		console.log(error.response);
	 }}
	 
	 
	 /* this function is a multipurpose function since it has a setter, even though its
	  a get profile function it can be used to request for data
	   that does not require user to be authenticated in order 
	  to access */
	 async get_profile(path,object,setter){
		var response;
	 try {
		 response = await axios_http.post(path,object);
		if(response.data.success){
			toast.success(response.data.message);
			setter(response.data.data);
		}else{
			toast.error(response.data.message);
		}
	 } catch (error) {
		toast.error("try again in a moment");
	 }}
	 
	 
	 async get_follower_recommendation(setter){
		// if user has token
		var response;
		if(this.hasToken){
			try {
				response = await axios_http.get("follower-recommendation-with-token",{
					headers: {
						'Authorization': `Bearer ${this.userToken}`
					  }
				 });
			   if(response.data.success){
				   setter(response.data.data);
				   
			   }else{
				   alert(response.data.message);
			   }
			} catch (error) {
			   toast.error("try again");
			}
		}
		// user is new
		if(!this.hasToken){
			try {
				response = await axios_http.get("follower-recommendation");
			   if(response.data.success){
				   setter(response.data.data);
				   
			   }else{
				   toast.error(response.data.message);
			   }
			} catch (error) {
			   toast.error("there was an error");
			}
		}
	}
	 
	 
	 
	 
	//  get user
	// this is a specific function just like the accounts request in post handler
	/* no changes should be made to it. */
	async get_user(setter){
		if(this.hasToken){
		var response;
	 try {
		 response = await axios_http.get('get-user',{
			headers: {
				'Authorization': `Bearer ${this.userToken}`
			  }
		 });
		if(response.data.success){
			setter(response.data.data);
		}else{
			toast.error(response.data.message);
		}
	 } catch (error) {
		toast.error("error in retrieving user");
	 }
	}else{
		// no token is availlable redirect the user to the signup page
		window.location.href='/accounts';
	}
	}
	
		// this is used to edit profile of the user and we only expect a message and a success but no data is
	/* 	is expected that is why there is no setter for this endpoint  user */
		async edit_user(path,object,setter){
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
					setter(response.data.data);
				}
			}else{
				toast.error(response.data.message);
			}
		 } catch (error) {
			toast.error("unable to perform opereations");
		 }
		}else{
			toast.error("you are logged out");
		}
		}
}

export default User;