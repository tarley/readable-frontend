import {combineReducers} from 'redux';
import {SET_ALL_POSTS,
		SET_ALL_CATEGORIES,
		RECEIVE_ALL} from '../actions'

function categories(state = {}, action) {
	switch(action.type) {
		case SET_ALL_CATEGORIES:
			return {
				values: action.categories
			}
		default:
			return state;
	}
}

function posts(state = {}, action) {
	switch(action.type) {
		case SET_ALL_POSTS:
			return {
				values: action.posts
			}
		default:
			return state;
	}
}

function comments(state = {}, action) {
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