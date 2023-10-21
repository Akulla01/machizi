import {toast} from "react-toastify";
class Validator {
	
	check_number(event,setter){
		var required_char = ['0','1','2','3','4','5','6','7','8','9'];
		var keyed_value =event.target.value;
		
		
		if(keyed_value.split('').some(each_value => !required_char.includes(each_value))){
			toast.error("follow this formart: 07xxxxxxxx only");	
			setter(prev=>({
				...prev,
				phone:''
			}));
		}else{
		setter(prev=>({
			...prev,
			phone:event.target.value
		}));			
		}
	}
	
	validate_username(event,setter){
		var not_required = [' ','!','#','$','%','^','&','*',')',')','[',']','-','+'];
		var keyed_value =event.target.value;
		// some returns a value that is either true or false
		if(keyed_value.split('').some(each_value => not_required.includes(each_value))){
			toast.error("no space in the user name or that symbol is not allowed you can use _");
			setter(prev=>({
				...prev,
				name:''
			}));
		}else{
		setter(prev=>({
			...prev,
			name:event.target.value
		}));			
		}
	}
}

export default Validator;