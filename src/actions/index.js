import * as PostAPI from '../utils/PostAPI';

export const SET_ALL_POSTS = 'SET_ALL_POSTS';
export const RECEIVE_ALL = 'RECEIVE_ALL';

export const setAllPosts = (posts) => ({
	type: SET_ALL_POSTS,
	posts
});

export const getAllPosts = () => (dispatch) => (
	PostAPI.getAll().then(posts => dispatch(setAllPosts(posts)))
);