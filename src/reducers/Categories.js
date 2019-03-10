import {RECEIVE_ALL_CATEGORIES} from '../actions/Categories';

const initialState = {}

const mapCategories = (result, category) => {
	result[category.name] = category;
	return result;
}

export function categories(state = initialState, action) {
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