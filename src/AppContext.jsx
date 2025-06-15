import { createContext, useState } from "react";
import { useSearch } from "./hooks/useSearch";
import { homeAddCase } from "./function/homeAddCase";
import { homeSortCase } from "./function/homeSortCase";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [cases, setCases] = useState("");
	const [newCase, setNewCase] = useState("");

	const [sort, setSort] = useState(false);

	const [search, setSearch] = useState("");
	const { resultSearch } = useSearch(cases, search, setIsLoading);

	const { requestAddCase } = homeAddCase(
		newCase,
		setCases,
		cases,
		setNewCase
	);

	const { sortCase } = homeSortCase(setSort, sort, setCases, cases);

	const [updateCase, setUpdateCaset] = useState("");

	const value = {
		isLoading,
		setIsLoading,
		newCase,
		setNewCase,
		sort,
		sortCase,
		setSort,
		search,
		setSearch,
		resultSearch,
		requestAddCase,
		setUpdateCaset,
		cases,
		setCases,
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
