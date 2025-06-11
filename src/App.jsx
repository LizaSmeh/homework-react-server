import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { CasePage } from "./components/CasePage";
import { HomePage } from "./components/HomePage";

function App() {
	const [cases, setCases] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const NoteFoundPage = () => {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "10px",
					alignItems: "center",
					justifyContent: "center",
					width: "100vw",
				}}
			>
				<span style={{ color: "rgb(77, 8, 31)", fontSize: "50px" }}>
					404-страница не найдена
				</span>
				<Link
					to="/"
					style={{
						color: "rgb(181, 21, 75)",
						fontSize: "30px",
						textDecoration: "underline",
					}}
				>
					Вернуться на главную
				</Link>
			</div>
		);
	};
	return (
		<Routes>
			<Route
				path="/"
				element={
					<HomePage
						cases={cases}
						setCases={setCases}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				}
			/>
			<Route
				path="/task/:id"
				element={
					<CasePage
						cases={cases}
						setCases={setCases}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				}
			/>

			<Route path="/404" element={<NoteFoundPage />} />
			<Route path="*" element={<Navigate to="/404" />} />
		</Routes>
	);
}

export default App;
