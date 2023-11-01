import { toast } from "react-toastify";
import axios_http from "./axios_http";
import useToken from "../modules/useToken";
import Basic from "../modules/basic";

class Adrequest{
	
	constructor(){
		const {is_token,decrypted} = useToken();
		this.basic = new Basic();
		this.token = decrypted;
		this.is_token = is_token;
	};
	async get_ads(path,setter){
		var response;
	 try {
		 response = await axios_http.post(path);
		if(response.data.success){
			setter(response.data.data);
		}
	 } catch (error) {
		toast.error("there was an error");
	 }
	}
	
	// ads with token
	async get_ads_tk(path,setter){
		
		if(this.is_token){
			var response;
			try {
				response = await axios_http.post(path,null,{
					headers: {
						'Authorization': `Bearer ${this.token}`
					  }
				 });
			if(response.data.success){
				setter(response.data);
			}
			} catch (error) {
				toast.error("there was an error");
				console.log(error);		
			}	
		}else{
			this.basic.redirect_user("accounts");
		}

	}
}

export default Adrequest;