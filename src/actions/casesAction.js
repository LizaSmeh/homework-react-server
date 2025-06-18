export const fetchCases = () => {
	return (dispatch) => {
		dispatch({ type: "SET_LOADING", payload: true });

		fetch("http://localhost:3000/cases")
			.then((loadedData) => loadedData.json())
			.then((loadedCases) => {
				dispatch({ type: "FETCH_CASES", payload: loadedCases });
				dispatch({ type: "SET_LOADING", payload: false });
			})
			.finally(() => dispatch({ type: "SET_LOADING", payload: false }));
	};
};

export const requestAddCase = (content) => {
	return (dispatch) => {
		fetch("http://localhost:3000/cases", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: content }),
		})
			.then((response) => response.json())
			.then((data) => dispatch({ type: "ADD_CASE", payload: data }));
	};
};

export const requestUpdateCase = (content, id) => {
	const task = prompt("Введите свои изменения:", content);

	return (dispatch) => {
		fetch(`http://localhost:3000/cases/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: task }),
		})
			.then((response) => response.json())

			.then((data) => {
				dispatch({ type: "UPDATE_CASE", payload: data });
			});
	};
};

export const requestDeleteCase = (id) => {
	return (dispatch) => {
		fetch(`http://localhost:3000/cases/${id}`, {
			method: "DELETE",
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => dispatch({ type: "DELETE_CASE", payload: id }));
	};
};
export const sortCases = () => ({
	type: "SORT_CASES",
});
