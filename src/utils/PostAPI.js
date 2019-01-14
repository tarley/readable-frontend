import {api, headers} from './Config.js';


export const get = (category) => 
	fetch(`${api}/${category}/posts`, headers)
		.then(data => data.json());

export const getAll = () =>
	fetch(`${api}/posts`, headers)
		.then(data => data.json());

export const create = (post) =>
	fetch(`${api}/posts`, {
		method: 'POST',
		...headers,
		body: JSON.stringify(post)
	}).then(data => data.json());

export const getById = (id) =>
	fetch(`${api}/posts/${id}`, headers)
		.then(data => data.json());

export const vote = (id, option) =>
	fetch(`${api}/posts/${id}`, {
		method: 'POST',
		...headers,
		body: JSON.stringify({option})
	}).then(data => data.json());

export const update = (post) =>
	fetch(`${api}/posts/${post.id}`, {
		method: 'PUT',
		...headers,
		body: JSON.stringify(post)
	}).then(data => data.json());


export const remove = (id) =>
	fetch(`${api}/posts/${id}`, {
		method: 'DELETE',
		...headers
	}).then(data => data.json());