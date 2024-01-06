import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to Your Personal Finance Dashboard</h1>
            <p>Manage your income, expenses, and savings goals efficiently.</p>
            
            <div>
                <button>View Transactions</button>
                <button>Set Goals</button>
            </div>
        </div>
    );
};

export default HomePage;
