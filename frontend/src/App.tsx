import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import MenuBar from './components/Navbar';
import "./App.css";

function App() {
	const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLoggedIn);

	return (
	<Router>
		<div className="App">
		<header className="App-header">
			{isLoggedIn && <MenuBar />}
			<Routes>
			<Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</header>
		</div>
	</Router>
	)
}

export default App;