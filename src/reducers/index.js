import {combineReducers} from 'redux';
import {RECEIVE_ALL_CATEGORIES,
		RECEIVE_ALL_POSTS,
		RECEIVE_POST,
		SORT_POSTS,
		UPDATE_VOTE_SCORE_POST,
		REMOVE_POST} from '../actions';

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
	switch(action.type) {
		case RECEIVE_ALL_POSTS:
   			const itens = action.posts.reduce(mapPosts, {});

			return {
				...itens
			}
		case RECEIVE_POST:
			console.group("RECEIVE_POST");
			const newState = {
				...state,
				[action.post.id]: action.post
			};
			//console.log(state);
			console.log(newState);
			console.groupEnd();

			return {
				...newState
			}
		case SORT_POSTS:
			const sortItens = Object.values(state).sort(action.method).reduce(mapPosts, {});

			return {
				...sortItens
			}
		case UPDATE_VOTE_SCORE_POST:
			console.group("UPDATE_VOTE_SCORE_POST");
			const newStateUpdateVote = {
				...state,
				[action.id]: {
					...state[action.id],
					['voteScore']: action.voteScore
				}
			}
			console.log(state);
			console.log(newStateUpdateVote);
			console.groupEnd();

			return {
				...newStateUpdateVote
			}
		case REMOVE_POST:
			console.group("REMOVE_POST");
			console.log(action.res);
			console.groupEnd();
			
			return {
				...state.filter(post => post.id !== action.id)
			}
		default:
			return state;
	}
}

function comments(state = initialState, action) {
	return state;
}


export default combineReducers({categories, posts, comments});