import * as UUID from 'uuid';
import {api, headers} from './Config.js';


export const getByCategory = (category) => 
	fetch(`${api}/${category}/posts`, headers)
		.then(data => data.json());

export const getAll = () =>
	fetch(`${api}/posts`, headers)
		.then(data => data.json());

export const create = (title, body, author, category) => {
	const request = {
		id: UUID.v1(),
		timestamp: Date.now(),
		title,
		body,
		author,
		category
	}

	return fetch(`${api}/posts`, {
		method: 'POST',
		...headers,
		body: JSON.stringify(request)
	}).then(data => data.json());
}

export const getById = (id) =>
	fetch(`${api}/posts/${id}`, headers)
		.then(data => data.json());

export const vote = (id, option) =>
	fetch(`${api}/posts/${id}`, {
		method: 'POST',
		...headers,
		body: JSON.stringify({option})
	}).then(data => data.json());

export const update = (id, newTitle, newBody) =>
	fetch(`${api}/posts/${id}`, {
		method: 'PUT',
		...headers,
		body: JSON.stringify({title: newTitle, body: newBody})
	}).then(data => data.json());


export const remove = (id) =>
	fetch(`${api}/posts/${id}`, {
		method: 'DELETE',
		...headers
	}).then(data => data.json());