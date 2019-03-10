import {RECEIVE_ALL_POSTS,
        RECEIVE_POST,
        SORT_POSTS,
        UPDATE_VOTE_SCORE_POST,
        REMOVE_POST} from '../actions/Posts';

const initialState = {}

const mapPosts = (result, post) => {
	result[post.id] = post;
	return result;
}

export function posts(state = initialState, action) {
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