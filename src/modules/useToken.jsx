import Cookies from 'js-cookie'
import React from 'react'
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';

function useToken() {
const token = Cookies.get(import.meta.env.VITE_TOKEN);
const encryption_key = import.meta.env.VITE_ENCRYPTION_KEY;


const decryptedToken = () =>{
	if(!token){
		return false;
	}
	
	const decrypted_token = CryptoJS.AES.decrypt(token, encryption_key).toString(CryptoJS.enc.Utf8);	
	return decrypted_token;
}


const encrypt_token = (data) =>{
	const encryptedData_token = CryptoJS.AES.encrypt(data,encryption_key).toString();
	Cookies.set(import.meta.env.VITE_TOKEN,encryptedData_token,{ expires: 28});	
	toast.success("welcome");
}

const delete_token = () =>{
	Cookies.remove(import.meta.env.VITE_TOKEN);
	toast.success("you are logged out");
	window.location.reload();
}

const encrypt_url_data =(url)=>{
	const encryptedUrl_data = CryptoJS.AES.encrypt(url,encryption_key).toString();
	return encryptedUrl_data;
}

const decrypt_url_data =(url)=>{
	const decryptedUrl_data = CryptoJS.AES.decrypt(url,encryption_key).toString(CryptoJS.enc.Utf8);
	return decryptedUrl_data;
}


return{
	encrypted:token,
	is_token: token ? true : false,
	decrypted: decryptedToken(),
	encrypt_token:encrypt_token,
	delete_token:delete_token,
	encrypt_url:encrypt_url_data,
	decrypt_url:decrypt_url_data
};
}

export default useToken