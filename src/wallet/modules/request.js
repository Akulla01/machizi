import { toast } from "react-toastify";
import useToken from "../../modules/useToken";
import axios_http from "../../modules/axios_http";
import Basic from "../../modules/basic";

class Walletrequest{
	
	constructor(){
		const {is_token,decrypted} = useToken();
		this.basic = new Basic();
		this.token = decrypted;
		this.is_token = is_token;
	};


	// publish ad
	async wallet_query(path,object,setter){
		
		if(this.is_token){
			var response;
			try {
				response = await axios_http.post(path,object,{
					headers: {
						'Authorization': `Bearer ${this.token}`
					  }
				 });
			if(response.data.success){
				toast.success(response.data.message);
				if(setter){
					setter(response.data.new_balance);
				}
				
			}else{
				toast.error(response.data.message);
			}
			} catch (error) {
				toast.error("there was an error");	
				console.log(error);
			}	
		}else{
		 toast.info("you are logged out");
		}
	}
	
	
	
	
	/* send the stk response to initiate the transaction with the payload and get the data returned */
	async stk_response(path,object,setter){
		
		if(this.is_token){
			var response;
			try {
				response = await axios_http.post(path,object,{
					headers: {
						'Authorization': `Bearer ${this.token}`
					  }
				 });
			if(response.data.success){
				console.log(response.data);
				if(setter){
					setter(response.data.stk_data);
				}
				
			}else{
				toast.error(response.data.message);
			}
			} catch (error) {
				toast.error("unable to initiate transaction");	
				console.log(error);
			}	
		}else{
		 toast.info("you are logged out");
		}
	}

	
	
	
	
	trim_ballance(ballance) {
		if(ballance > 1000 && ballance < 1000000){
			ballance = Math.floor(ballance/1000)+" K";
			return ballance;
		}
		
		if(ballance >= 1000000 && ballance < 1000000000){
			 ballance = Math.floor(ballance/1000000)+" M";
			return ballance;
		}
		
		if(ballance >= 1000000000){
			ballance = Math.floor(ballance/1000000)+"Bn";
		   return ballance;
	   }
	   
	   return ballance;

	}
	
	
	
	
	
	async transactions_query(path,setter){
		
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
		 toast.info("you are logged out");
		}
	}
	
}

export default Walletrequest;