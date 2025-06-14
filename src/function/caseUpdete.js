export const caseUpdete = (setUpdateCaset, updateCase, setCases) => {
	const requestUpdateCase = (content, id) => {
			const task = prompt("Введите свои изменения:", content);
			setUpdateCaset(task);

			fetch(`http://localhost:3000/cases/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ content: task }),
			})
				.then((response) => response.json())
				.then((data) => {
					setCases(data);
				});
		};
		return {requestUpdateCase}
}
