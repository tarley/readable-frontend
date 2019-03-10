import {RECEIVE_ALL_COMMENTS,
        RECEIVE_COMMENT,
        UPDATE_VOTE_SCORE_COMMENT,
        REMOVE_COMMENT} from '../actions/Comments';

import {METHOD_SORT_BY_VOTE_SCORE} from '../utils/Helpers'

const initialState = {}

const mapComments = (result, comment) => {
    result[comment.id] = comment;
    return result;
}

export function comments(state = initialState, action) {
    let newState;

    switch(action.type) {
        case RECEIVE_ALL_COMMENTS:
            newState = action.comments.sort(METHOD_SORT_BY_VOTE_SCORE).reduce(mapComments, {});

            return {
                ...newState
            }
        case RECEIVE_COMMENT:
            newState = {
                ...state,
                [action.comment.id]: action.comment
            };
            
            newState = Object.values(newState).sort(METHOD_SORT_BY_VOTE_SCORE).reduce(mapComments, {});

            return {
                ...newState
            }
        case UPDATE_VOTE_SCORE_COMMENT:
            newState = {
                ...state
            }

            newState[action.id].voteScore = action.voteScore;

            
            newState = Object.values(newState).sort(METHOD_SORT_BY_VOTE_SCORE).reduce(mapComments, {});

            return {
                ...newState
            }
        case REMOVE_COMMENT:
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