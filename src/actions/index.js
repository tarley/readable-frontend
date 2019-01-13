import * as CategoryAPI from '../utils/CategoryAPI';
import * as PostAPI from '../utils/PostAPI';

export const SET_ALL_CATEGORIES = 'SET_ALL_CATEGORIES';
export const SET_ALL_POSTS = 'SET_ALL_POSTS';
export const SORT_POSTS = 'SORT_POSTS';
export const RECEIVE_ALL = 'RECEIVE_ALL';


const DEFAULT_POST_SORT = (a, b) => b.voteScore - a.voteScore;

export const setAllCategories = (categories) => ({
	type: SET_ALL_CATEGORIES,
	categories
});

export const getAllCategories = () => (dispatch) => (
	CategoryAPI.getAll().then(categories => dispatch(setAllCategories(categories)))
)

export const setAllPosts = (posts) => ({
	type: SET_ALL_POSTS,
	posts: posts.sort(DEFAULT_POST_SORT)
});

export const getAllPosts = () => (dispatch) => (
	PostAPI.getAll().then(posts => dispatch(setAllPosts(posts)))
);

export const getPosts = (category) => (dispatch) => (
	PostAPI.get(category).then(posts => dispatch(setAllPosts(posts)))
);

export function sortPostsByVoteScore() {
	return {
		type: SORT_POSTS,
		method: DEFAULT_POST_SORT
	}
}

export function sortPostsByCreateDate() {
	return {
		type: SORT_POSTS,
		method: (a, b) => b.timestamp - a.timestamp
	}
}