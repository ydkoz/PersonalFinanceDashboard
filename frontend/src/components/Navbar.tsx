import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NavBar = () => {
	return (
		<nav className="navbar">
			<div className="nav-container">
				<Link to="/dashboard" className="nav-logo">
					Dashboard
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
