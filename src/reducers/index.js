import {combineReducers} from 'redux';
import {SET_ALL_POSTS,
		SET_ALL_CATEGORIES,
		SORT_POSTS,
		RECEIVE_ALL} from '../actions';

const initialState = {
	values: []
}

function categories(state = initialState, action) {
	switch(action.type) {
		case SET_ALL_CATEGORIES:
			return {
				values: action.categories
			}
		default:
			return state;
	}
}

function posts(state = initialState, action) {
	switch(action.type) {
		case SET_ALL_POSTS:
			return {
				values: action.posts
			}
		case SORT_POSTS:
			const sortValues = Object.assign([], state.values.sort(action.method));

			return {
				values: sortValues
			}
		default:
			return state;
	}
}

function comments(state = initialState, action) {
	switch(action.type) {
		case RECEIVE_ALL:
			return {
				values: action.comments
			}
		default:
			return state;
	}
}


export default combineReducers({categories, posts, comments});