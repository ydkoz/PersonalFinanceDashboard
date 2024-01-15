import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

const Dashboard = () => {
	const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLoggedIn);
	const transactions = useAppSelector((state:RootState) => state.transaction.transactions);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/login');
		}
	}, [isLoggedIn, navigate]);

	return (
		<div className="dashboard-content">
			{isLoggedIn && <h1>Transactions</h1>}
			<button type="submit">Add a New Transaction</button>
			{transactions.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Amount</th>
							<th>Type</th>
							<th>Category</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((transaction) => (
							<tr key={transaction.id}>
								<td>{transaction.date}</td>
								<td>{transaction.amount}</td>
								<td>{transaction.type}</td>
								<td>{transaction.category}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No transactions yet.</p>
			)}
		</div>
	);
};

export default Dashboard;
