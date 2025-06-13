import { useEffect, useState } from 'react';
import { useDebounseSearch } from './useDebounse';

export const useSearch = (cases, search) => {
	const [resultSearch, setResultSearch] = useState([]);
	const debouncedSearchTerm = useDebounseSearch(search, 500);

	useEffect(() => {
		if (debouncedSearchTerm && debouncedSearchTerm.trim() !== "") {


			fetch(`http://localhost:3000/cases?q=${debouncedSearchTerm}`)
				.then((response) => response.json())
				.then((data) => {
					setResultSearch(data);
				})

		} else {
			setResultSearch(cases);
		}
	}, [debouncedSearchTerm, cases]);

	return {resultSearch}
}
