import axios from 'axios';

const axios_http = axios.create({
	 baseURL:import.meta.env.VITE_BACKEND_URL
	});

  export default axios_http;