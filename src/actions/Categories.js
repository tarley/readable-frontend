import * as CategoryAPI from '../utils/CategoryAPI';

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