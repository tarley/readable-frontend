import {api, headers} from './Config';

export const getAll = () =>
	fetch(`${api}/categories`, headers)
		.then(res => res.json())
		.then(resJson => resJson.categories);