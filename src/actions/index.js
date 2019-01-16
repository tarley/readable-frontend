import * as CategoryAPI from '../utils/CategoryAPI';
import * as PostAPI from '../utils/PostAPI';

export const RECEIVE_ALL_CATEGORIES = 'RECEIVE_ALL_CATEGORIES';

export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const SORT_POSTS = 'SORT_POSTS';
export const UPDATE_VOTE_SCORE_POST = 'UPDATE_VOTE_SCORE_POST';
export const REMOVE_POST = 'REMOVE_POST'

export const getAllCategories = () => (dispatch) => (
	//CategoryAPI.getAll().then(categories => dispatch(setAllCategories(categories)))
	CategoryAPI.getAll().then(categories => 
		dispatch({
			type: RECEIVE_ALL_CATEGORIES,
			categories
		})
	)
)

const SORT_POSTS_BY_VOTE_SCORE = (a, b) => b.voteScore - a.voteScore;
const SORT_POSTS_BY_CREATE_DATE = (a, b) => b.timestamp - a.timestamp;

export const getAllPosts = () => (dispatch) => (
	PostAPI.getAll().then(posts => 
		dispatch({
			type: RECEIVE_ALL_POSTS,
			posts: posts.sort(SORT_POSTS_BY_VOTE_SCORE)
		})
	)
);

export const getPostsByCategory = (category) => (dispatch) => (
	PostAPI.getByCategory(category).then(posts => 
		dispatch({
			type: RECEIVE_ALL_POSTS,
			posts: posts.sort(SORT_POSTS_BY_VOTE_SCORE)
		})
	)
);

export const getPostById = (id) => (dispatch) => (
	PostAPI.getById(id).then(post => 
		dispatch({
			type: RECEIVE_POST,
			post: post
		})
	)
);

export function sortPostsByVoteScore() {
	return {
		type: SORT_POSTS,
		method: SORT_POSTS_BY_VOTE_SCORE
	}
}


export function sortPostsByCreateDate() {
	return {
		type: SORT_POSTS,
		method: SORT_POSTS_BY_CREATE_DATE
	}
}

export const upVotePost = (id) => (dispatch) =>  (
	PostAPI.vote(id, 'upVote').then(res => 
		dispatch({
			type: UPDATE_VOTE_SCORE_POST,
			id: id,
			voteScore: res.voteScore
		})
	)
);

export const downVotePost = (id) => (dispatch) =>  (
	PostAPI.vote(id, 'downVote').then(post => 
		dispatch({
			type: UPDATE_VOTE_SCORE_POST,
			id: id,
			voteScore: post.voteScore
		})
	)
);

export const createPost = (title, body, author, category) => (dispatch) => (
	PostAPI.create(title, body, author, category).then(post => 
		dispatch({
			type: RECEIVE_POST,
			post
		})
	)
);

export const updatePost = (id, newTitle, newBody) => (dispatch) => {
	PostAPI.update(id, newTitle, newBody).then(post => 
		dispatch({
			type: RECEIVE_POST,
			post
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