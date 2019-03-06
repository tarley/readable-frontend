import * as CategoryAPI from '../utils/CategoryAPI';
import * as PostAPI from '../utils/PostAPI';
import * as CommentAPI from '../utils/CommentAPI';

export const METHOD_SORT_BY_VOTE_SCORE = (a, b) => b.voteScore - a.voteScore;
export const METHOD_SORT_BY_CREATE_DATE = (a, b) => b.timestamp - a.timestamp;

/* Actions Category */
export const RECEIVE_ALL_CATEGORIES = 'RECEIVE_ALL_CATEGORIES';

export const getAllCategories = () => (dispatch) => (
	CategoryAPI.getAll().then(categories => 
		dispatch({
			type: RECEIVE_ALL_CATEGORIES,
			categories
		})
	)
)

/* Actions Post*/
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const SORT_POSTS = 'SORT_POSTS';
export const UPDATE_VOTE_SCORE_POST = 'UPDATE_VOTE_SCORE_POST';
export const REMOVE_POST = 'REMOVE_POST'

let postSortMethod = METHOD_SORT_BY_VOTE_SCORE;

export const getAllPosts = () => (dispatch) => (
	PostAPI.getAll().then(posts => 
		dispatch({
			type: RECEIVE_ALL_POSTS,
			posts,
			postSortMethod
		})
	)
);

export const getPostsByCategory = (category) => (dispatch) => (
	PostAPI.getByCategory(category).then(posts => 
		dispatch({
			type: RECEIVE_ALL_POSTS,
			posts,
			postSortMethod
		})
	)
);

export const getPostById = (id) => (dispatch) => (
	PostAPI.getById(id).then(post => 
		dispatch({
			type: RECEIVE_POST,
			post,
			postSortMethod
		})
	)
);

export function sortPostsByVoteScore() {
	postSortMethod = METHOD_SORT_BY_VOTE_SCORE;

	return {
		type: SORT_POSTS,
		postSortMethod
	}
}


export function sortPostsByCreateDate() {
	postSortMethod = METHOD_SORT_BY_CREATE_DATE;

	return {
		type: SORT_POSTS,
		postSortMethod
	}
}

export const upVotePost = (id) => (dispatch) =>  (
	PostAPI.vote(id, 'upVote').then(res => 
		dispatch({
			type: UPDATE_VOTE_SCORE_POST,
			id,
			voteScore: res.voteScore,
			postSortMethod
		})
	)
);

export const downVotePost = (id) => (dispatch) =>  (
	PostAPI.vote(id, 'downVote').then(post => 
		dispatch({
			type: UPDATE_VOTE_SCORE_POST,
			id,
			voteScore: post.voteScore,
			postSortMethod
		})
	)
);

export const createPost = (title, body, author, category) => (dispatch) => (
	PostAPI.create(title, body, author, category).then(post => 
		dispatch({
			type: RECEIVE_POST,
			post,
			postSortMethod
		})
	)
);

export const updatePost = (id, newTitle, newBody) => (dispatch) => {
	PostAPI.update(id, newTitle, newBody).then(post => 
		dispatch({
			type: RECEIVE_POST,
			post,
			postSortMethod
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


/* Actions Comment*/
export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const UPDATE_VOTE_SCORE_COMMENT = 'UPDATE_VOTE_SCORE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const getAllComments = (idPost) => (dispatch) =>
	CommentAPI.getAll(idPost).then(comments => 
		dispatch({
			type: RECEIVE_ALL_COMMENTS,
			comments: comments
		}))

export const getCommentById = (id) => (dispatch) => (
	CommentAPI.getById(id).then(comment => 
		dispatch({
			type: RECEIVE_COMMENT,
			comment
		})
	)
);

export const createComment = (body, author, postId) => (dispatch) => (
	CommentAPI.create(body, author, postId).then(comment => 
		dispatch({
			type: RECEIVE_COMMENT,
			comment
		})
	)
);

export const updateComment = (id, newBody) => (dispatch) => (
	CommentAPI.update(id, newBody).then(comment => 
		dispatch({
			type: RECEIVE_COMMENT,
			comment
		})
	)
);

export const deleteComment = (id) => (dispatch) => (
	CommentAPI.remove(id).then(comment => 
		dispatch({
			type: REMOVE_COMMENT,
			id,
			comment
		})	
	)
);

export const upVoteComment = (id) => (dispatch) =>  (
	CommentAPI.vote(id, 'upVote').then(res => 
		dispatch({
			type: UPDATE_VOTE_SCORE_COMMENT,
			id: id,
			voteScore: res.voteScore
		})
	)
);

export const downVoteComment = (id) => (dispatch) =>  (
	CommentAPI.vote(id, 'downVote').then(post => 
		dispatch({
			type: UPDATE_VOTE_SCORE_COMMENT,
			id: id,
			voteScore: post.voteScore
		})
	)
);
