import * as PostAPI from '../utils/PostAPI';
import {METHOD_SORT_BY_VOTE_SCORE,
		METHOD_SORT_BY_CREATE_DATE} from '../utils/Helpers';

/* Actions Post*/
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const SORT_POSTS = 'SORT_POSTS';
export const UPDATE_VOTE_SCORE_POST = 'UPDATE_VOTE_SCORE_POST';
export const REMOVE_POST = 'REMOVE_POST'

let postSortMethod = METHOD_SORT_BY_VOTE_SCORE;

export const getAllPosts = () => (dispatch) => (
	PostAPI.getAll().then(posts => 
		dispatch({
			type: RECEIVE_ALL_POSTS,
			posts,
			postSortMethod
		})
	)
);

export const getPostsByCategory = (category) => (dispatch) => (
	PostAPI.getByCategory(category).then(posts => 
		dispatch({
			type: RECEIVE_ALL_POSTS,
			posts,
			postSortMethod
		})
	)
);

export const getPostById = (id) => (dispatch) => (
	PostAPI.getById(id).then(post => 
		dispatch({
			type: RECEIVE_POST,
			post,
			postSortMethod
		})
	)
);

export function sortPostsByVoteScore() {
	postSortMethod = METHOD_SORT_BY_VOTE_SCORE;

	return {
		type: SORT_POSTS,
		postSortMethod
	}
}


export function sortPostsByCreateDate() {
	postSortMethod = METHOD_SORT_BY_CREATE_DATE;

	return {
		type: SORT_POSTS,
		postSortMethod
	}
}

export const upVotePost = (id) => (dispatch) =>  (
	PostAPI.vote(id, 'upVote').then(res => 
		dispatch({
			type: UPDATE_VOTE_SCORE_POST,
			id,
			voteScore: res.voteScore,
			postSortMethod
		})
	)
);

export const downVotePost = (id) => (dispatch) =>  (
	PostAPI.vote(id, 'downVote').then(post => 
		dispatch({
			type: UPDATE_VOTE_SCORE_POST,
			id,
			voteScore: post.voteScore,
			postSortMethod
		})
	)
);

export const createPost = (title, body, author, category) => (dispatch) => (
	PostAPI.create(title, body, author, category).then(post => 
		dispatch({
			type: RECEIVE_POST,
			post,
			postSortMethod
		})
	)
);

export const updatePost = (id, newTitle, newBody) => (dispatch) => {
	PostAPI.update(id, newTitle, newBody).then(post => 
		dispatch({
			type: RECEIVE_POST,
			post,
			postSortMethod
		})
	)
}

export const deletePost = (id) => (dispatch) => {
	PostAPI.remove(id).then(post =>
		dispatch({
			type: REMOVE_POST,
			id,
			post
		}))
}