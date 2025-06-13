export const homeAddCase = (newCase, setCases, cases, setNewCase) => {
	const requestAddCase = () => {
		fetch("http://localhost:3000/cases", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content: newCase,
				completed: false,
			}),
		})
			.then((response) => response.json())
			.then((data) => setCases([...cases, data]));
		setNewCase("");
	};

	return {requestAddCase}
}
