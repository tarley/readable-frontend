import * as CategoryAPI from '../utils/CategoryAPI';
import * as PostAPI from '../utils/PostAPI';

export const SET_ALL_CATEGORIES = 'SET_ALL_CATEGORIES';
export const SET_ALL_POSTS = 'SET_ALL_POSTS';

export const RECEIVE_ALL = 'RECEIVE_ALL';

export const setAllCategories = (categories) => ({
	type: SET_ALL_CATEGORIES,
	categories
});

export const getAllCategories = () => (dispatch) => (
	CategoryAPI.getAll().then(categories => dispatch(setAllCategories(categories)))
)

export const setAllPosts = (posts) => ({
	type: SET_ALL_POSTS,
	posts
});

export const getAllPosts = () => (dispatch) => (
	PostAPI.getAll().then(posts => dispatch(setAllPosts(posts)))
);

export const getPosts = (category) => (dispatch) => (
	PostAPI.get(category).then(posts => dispatch(setAllPosts(posts)))
);