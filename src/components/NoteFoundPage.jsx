import { Link } from "react-router-dom";

export const NoteFoundPage = () => {
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
