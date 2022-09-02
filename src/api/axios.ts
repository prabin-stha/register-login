import axios from 'axios';

const baseURL =
	'https://8f2d-2400-1a00-bd11-f6a8-e3fc-1b98-7239-8ae6.in.ngrok.io/api/v1/';

export default axios.create({
	baseURL,
});
