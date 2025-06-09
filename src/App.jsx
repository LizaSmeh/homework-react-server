import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { useDebounseSearch } from "./hooks/useDebounse";

function App() {
	const [cases, setCases] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshCases, setRefreshCases] = useState(false);

	const [newCase, setNewCase] = useState("");
	const [updateCase, setUpdateCaset] = useState("");

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

	const requestUpdateCase = (content, id) => {
		const task = prompt("Введите свои изменения:", content);
		setUpdateCaset(task);

		fetch(`http://localhost:3000/cases/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: updateCase }),
		})
			.then((response) => response.json())

			.then((data) => {
				setCases((prevTasks) =>
					prevTasks.map((item) => (item.id === id ? data : item))
				);
			});
	};

	const requestDeleteCase = (id) => {
		fetch(`http://localhost:3000/cases/${id}`, {
			method: "DELETE",
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => setCases(cases.filter((task) => task.id !== id)));
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
									{content}

									<button
										className={styles.icon}
										onClick={() => requestDeleteCase(id)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="50"
											height="50"
											viewBox="0 0 100 100"
										>
											<path
												fill="#f37e98"
												d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"
											></path>
											<path
												fill="#f15b6c"
												d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z"
											></path>
											<path
												fill="#1f212b"
												d="M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z"
											></path>
											<path
												fill="#1f212b"
												d="M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z"
											></path>
											<path
												fill="#1f212b"
												d="M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z"
											></path>
											<path
												fill="#1f212b"
												d="M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z"
											></path>
										</svg>
									</button>
									<button
										onClick={() =>
											requestUpdateCase(content, id)
										}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											x="0px"
											y="0px"
											width="50"
											height="50"
											viewBox="0 0 48 48"
										>
											<path
												fill="#c94f60"
												d="M42.583,9.067l-3.651-3.65c-0.555-0.556-1.459-0.556-2.015,0l-1.718,1.72l5.664,5.664l1.72-1.718	C43.139,10.526,43.139,9.625,42.583,9.067"
											></path>
											<path
												fill="#f0f0f0"
												d="M6.905,35.43L5,43l7.571-1.906l0.794-6.567L6.905,35.43z"
											></path>
											<path
												fill="#edbe00"
												d="M36.032,17.632l-23.46,23.461l-5.665-5.665l23.46-23.461L36.032,17.632z"
											></path>
											<linearGradient
												id="YoPixpDbHWOyk~b005eF1a_OWRPl8fxkRvG_gr1"
												x1="35.612"
												x2="35.612"
												y1="7.494"
												y2="17.921"
												gradientUnits="userSpaceOnUse"
											>
												<stop
													offset="0"
													stop-color="#dedede"
												></stop>
												<stop
													offset="1"
													stop-color="#d6d6d6"
												></stop>
											</linearGradient>
											<path
												fill="url(#YoPixpDbHWOyk~b005eF1a_OWRPl8fxkRvG_gr1)"
												d="M30.363,11.968l4.832-4.834l5.668,5.664l-4.832,4.834L30.363,11.968z"
											></path>
											<path
												fill="#787878"
												d="M5.965,39.172L5,43l3.827-0.965L5.965,39.172z"
											></path>
										</svg>
									</button>
								</li>
							)
						)}
					</ul>
				)}
			</div>
		</>
	);
}

export default App;
