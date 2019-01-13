import {api, headers} from './Config.js';


export const get = (category) => 
	fetch(`${api}/${category}/posts`, headers)
		.then(data => data.json());

export const getAll = () =>
	fetch(`${api}/posts`, headers)
		.then(data => data.json());