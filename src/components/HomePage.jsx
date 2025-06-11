import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../App.module.css";
import { useDebounseSearch } from "../hooks/useDebounse";

const textOneLine = (text, maxLength = 30) => {
	if (text.length > maxLength) {
		return text.slice(0, maxLength) + "...";
	}
	return text;
};

export const HomePage = ({ cases, setCases, isLoading, setIsLoading }) => {
	const [refreshCases, setRefreshCases] = useState(false);

	const [newCase, setNewCase] = useState("");

	const [sort, setSort] = useState(false);

	const [search, setSearch] = useState("");
	const [resultSearch, setResultSearch] = useState([]);
	const debouncedSearchTerm = useDebounseSearch(search, 500);

	useEffect(() => {
		setIsLoading(true);

		fetch("http://localhost:3000/cases")
			.then((loadedData) => loadedData.json())
			.then((loadedCases) => {
				setCases(loadedCases);
			})
			.finally(() => setIsLoading(false));
	}, [refreshCases]);

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

	const sortCase = () => {
		setSort(!sort);
		if (!sort) {
			setCases(
				cases.toSorted((a, b) => a.content.localeCompare(b.content))
			);
		}
	};

	useEffect(() => {
		if (debouncedSearchTerm && debouncedSearchTerm.trim() !== "") {
			setIsLoading(true);

			fetch(`http://localhost:3000/cases?q=${debouncedSearchTerm}`)
				.then((response) => response.json())
				.then((data) => {
					setResultSearch(data);
				})
				.finally(() => setIsLoading(false));
		} else {
			setResultSearch(cases);
		}
	}, [debouncedSearchTerm, cases]);

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles.title}>Список дел:</h1>
				<div className={styles.inputs}>
					<input
						className={styles.input}
						type="text"
						value={newCase}
						onChange={(event) => setNewCase(event.target.value)}
						placeholder="Введите задачу"
					/>
					<input
						className={styles.input}
						type="text"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Напишите фразу для поиска"
					/>
				</div>
				<div className={styles.buttons}>
					<button className={styles.button} onClick={requestAddCase}>
						Добавить
					</button>

					<button className={styles.button} onClick={sortCase}>
						Сортировка
					</button>
				</div>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : resultSearch.length === 0 ? (
					<div>'Ничего не нашли'</div>
				) : (
					<ul className={styles.list}>
						{(search ? resultSearch : cases).map(
							({ id, content }) => (
								<li className={styles.case} key={id}>
									<NavLink
										to={`/task/${id}`}
										className={styles.navlink}
									>
										{textOneLine(content)}
									</NavLink>
								</li>
							)
						)}
					</ul>
				)}
			</div>
		</>
	);
};
