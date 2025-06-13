import { useEffect, useState } from 'react';

export const useGetCase = (id) => {
	const [cases, setCases] = useState('');


	useEffect(() => {
		fetch(`http://localhost:3000/cases/${id}`)
			.then((loadedData) => loadedData.json())
			.then((loadedCases) => {
				setCases(loadedCases);
			})

	}, [id]);
	return {cases, setCases, id}
}

