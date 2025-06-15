import { NavLink } from "react-router-dom";
import styles from "../App.module.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import { textOneLine } from "../function/textOneLine";

export const HomePage = () => {
	const {
		isLoading,
		setIsLoading,
		newCase,
		setNewCase,
		sortCase,
		search,
		setSearch,
		resultSearch,
		requestAddCase,
		cases,
		setCases,
	} = useContext(AppContext);

	useEffect(() => {
		setIsLoading(true);

		fetch("http://localhost:3000/cases")
			.then((loadedData) => loadedData.json())
			.then((loadedCases) => {
				setCases(loadedCases);
			})
			.finally(() => setIsLoading(false));
	}, []);

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
