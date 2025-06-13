export const caseDelete = (navigate) => {
	const requestDeleteCase = (id) => {
		fetch(`http://localhost:3000/cases/${id}`, {
			method: "DELETE",
		});
		navigate("/");
	};
	return {requestDeleteCase}
}
