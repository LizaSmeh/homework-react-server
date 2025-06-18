const initialState = {
	sort: false,
};

export const sortReduser = (state = initialState, action) => {
	switch (action.type) {
		case "SORT_CASES":
			return { ...state, sort: !state.sort };
		default:
			return state;
	}
};
