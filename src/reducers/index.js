import {combineReducers} from 'redux';
import {SET_ALL_POSTS,
		RECEIVE_ALL} from '../actions'


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


export default combineReducers({posts, comments});