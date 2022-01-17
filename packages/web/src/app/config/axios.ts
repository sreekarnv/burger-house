import Axios from 'axios';
import { SERVER_URL } from './constants';

export const axios = Axios.create({
	baseURL: SERVER_URL,
	withCredentials: true,
});

export const add = (a: number, b: number) => a + b;
