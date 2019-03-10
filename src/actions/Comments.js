import * as CommentAPI from '../utils/CommentAPI';

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
