export const initialCase = {
	cases: [],
};

export const casesReduser = (state = initialCase, action) => {
	const { type, payload } = action;

	switch (type) {
		case "FETCH_CASES":
			return {
				...state,
				cases: payload,
			};
		case "ADD_CASE":
			return {
				...state,
				cases: [...state.cases, payload],
			};
		case "DELETE_CASE":
			return {
				...state,
				cases: state.cases.filter((task) => task.id !== payload),
			};
		case "UPDATE_case":
			return {
				...state,
				cases: state.cases.map((task) =>
					task.id === payload.id
						? { ...task, content: payload.content }
						: task
				),
			};
		default:
			return state;
	}
};
