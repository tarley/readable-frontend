import {combineReducers} from 'redux';
import {RECEIVE_ALL_CATEGORIES,
		RECEIVE_ALL_POSTS,
		RECEIVE_POST,
		SORT_POSTS,
		UPDATE_VOTE_SCORE_POST,
		REMOVE_POST,
		RECEIVE_ALL_COMMENTS,
		RECEIVE_COMMENT,
		UPDATE_VOTE_SCORE_COMMENT,
		REMOVE_COMMENT,
		METHOD_SORT_BY_VOTE_SCORE} from '../actions';

const initialState = {}

const mapCategories = (result, category) => {
	result[category.name] = category;
	return result;
}

function categories(state = initialState, action) {
	switch(action.type) {
		case RECEIVE_ALL_CATEGORIES:
			const itens = action.categories.reduce(mapCategories, {});
			
			return {
				...itens
			}
		default:
			return state;
	}
}

const mapPosts = (result, post) => {
	result[post.id] = post;
	return result;
}

function posts(state = initialState, action) {
	let newState;

	switch(action.type) {
		case RECEIVE_ALL_POSTS:
			newState = action.posts.sort(action.postSortMethod).reduce(mapPosts, {});

			return {
				...newState
			}
		case RECEIVE_POST:
			newState = {
				...state,
				[action.post.id]: action.post
			};
			
			newState = Object.values(newState).sort(action.postSortMethod).reduce(mapPosts, {}); 

			return {
				...newState
			}
		case SORT_POSTS:
			newState = Object.values(state).sort(action.postSortMethod).reduce(mapPosts, {});

			return {
				...newState
			}
		case UPDATE_VOTE_SCORE_POST:
			newState = {
				...state
			}
			newState[action.id].voteScore = action.voteScore;


			newState = Object.values(newState).sort(action.postSortMethod).reduce(mapPosts, {});

			return {
				...newState
			}
		case REMOVE_POST:
			newState = {
				...state
			}

			delete newState[action.id];

			return {
				...newState
			}
		default:
			return state;
	}
}

const mapComments = (result, comment) => {
	result[comment.id] = comment;
	return result;
}

function comments(state = initialState, action) {
	let newState;

	switch(action.type) {
		case RECEIVE_ALL_COMMENTS:
			newState = action.comments.sort(METHOD_SORT_BY_VOTE_SCORE).reduce(mapComments, {});

			return {
				...newState
			}
		case RECEIVE_COMMENT:
			newState = {
				...state,
				[action.comment.id]: action.comment
			};
			
			newState = Object.values(newState).sort(METHOD_SORT_BY_VOTE_SCORE).reduce(mapComments, {});

			return {
				...newState
			}
		case UPDATE_VOTE_SCORE_COMMENT:
			newState = {
				...state
			}

			newState[action.id].voteScore = action.voteScore;

			
			newState = Object.values(newState).sort(METHOD_SORT_BY_VOTE_SCORE).reduce(mapComments, {});

			return {
				...newState
			}
		case REMOVE_COMMENT:
			newState = {
				...state
			}
			delete newState[action.id];
			return {
				...newState
			}
		default: 
			return state;
	}
}


export default combineReducers({categories, posts, comments});