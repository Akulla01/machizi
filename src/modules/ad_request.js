import { toast } from "react-toastify";
import axios_http from "./axios_http";

class Adrequest{
	
	constructor(){};
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
}

export default Adrequest;