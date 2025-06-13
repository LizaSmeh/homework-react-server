import { useEffect, useState } from 'react';

export const useGetTodo = (setIsLoading) => {
	const [cases, setCases] = useState([]);

	useEffect(() => {
	setIsLoading(true);

	fetch("http://localhost:3000/cases")
		.then((loadedData) => loadedData.json())
		.then((loadedCases) => {
			setCases(loadedCases);
		})
		.finally(() => setIsLoading(false));
	}, []);
	return {cases, setCases}
}
