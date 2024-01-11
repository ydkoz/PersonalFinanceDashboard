import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

const Dashboard = () => {
	const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLoggedIn);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/login');
		}
	}, [isLoggedIn, navigate]);

	return (
		<div className="dashboard-content">
			{isLoggedIn && <h1>Dashboard</h1>}
			{/* implementation */}
		</div>
	);
};

export default Dashboard;
