import * as UUID from 'uuid';
import {api, headers} from './Config';


export const getAll = (idPost) =>
	fetch(`${api}/posts/${idPost}/comments`, headers)
		.then(data => data.json());


export const create = (body, author, postId) => {
	const request = {
		id: UUID.v1(),
		timestamp: Date.now(),
		body,
		author,
		parentId: postId 
	};
	return fetch(`${api}/comments`, {
		method: 'POST',
		...headers,
		body: JSON.stringify(request)

	}).then(data => data.json());
}

export const getById = (id) => 
	fetch(`${api}/comments/${id}`, headers)
		.then(data => data.json());

export const vote = (id, option) =>
	fetch(`${api}/comments/${id}`,{
		method: 'POST',
		...headers,
		body: JSON.stringify({option})
	}).then(data => data.json());

export const update = (id, newBody) =>
	fetch(`${api}/comments/${id}`, {
		method: 'PUT',
		...headers,
		body: JSON.stringify({
			timestamp: Date.now(),
			body: newBody
		})
	}).then(data => data.json());

export const remove = (id) =>
	fetch(`${api}/comments/${id}`, {
		method: 'DELETE',
		...headers
	}).then(data => data.json());