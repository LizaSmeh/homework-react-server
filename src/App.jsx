import { Routes, Route, Navigate } from "react-router-dom";
import { CasePage } from "./components/CasePage";
import { HomePage } from "./components/HomePage";
import { NoteFoundPage } from './components/NoteFoundPage'
import { AppProvider } from "./AppContext";

function App() {

	return (

		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/task/:id" element={<CasePage />} />
			<Route path="/404" element={<NoteFoundPage />} />
			<Route path="*" element={<Navigate to="/404" />} />
		</Routes>

	);
}

export default App;
