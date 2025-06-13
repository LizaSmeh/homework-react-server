import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../App.module.css";
import { useGetTodo } from "../hooks/useGetTodo";
import { useSearch } from "../hooks/useSearch";
import { textOneLine } from "../function/textOneLine";
import { homeAddCase } from "../function/homeAddCase";
import { homeSortCase } from "../function/homeSortCase";

export const HomePage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { cases, setCases } = useGetTodo(setIsLoading);

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
