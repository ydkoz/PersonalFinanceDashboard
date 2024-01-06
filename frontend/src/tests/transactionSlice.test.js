import transactionReducer, {
	addTransaction,
	setTransactions,
	setCurrentTransaction,
	updateTransaction,
	deleteTransaction,
	setTransactionLoading,
	setTransactionError,
} from '../features/transactionSlice';

describe('Transaction Slice', () => {
	const initialState = {
	transactions: [],
	transactionLoading: false,
	transactionError: null,
	currentTransaction: null,
	};

	it('should handle adding a new transaction', () => {
	const newState = transactionReducer(initialState, addTransaction({ id: '1', amount: 100, description: 'Test' }));
	expect(newState.transactions).toHaveLength(1);
	expect(newState.transactions[0].id).toBe('1');
	});

	it('should handle setting transactions', () => {
	const transactions = [{ id: '1', amount: 100, description: 'Test' }];
	const newState = transactionReducer(initialState, setTransactions(transactions));
	expect(newState.transactions).toHaveLength(1);
	expect(newState.transactions).toEqual(transactions);
	});

	it('should handle setting current transaction', () => {
	const newTransaction = { id: '1', amount: 100, description: 'Test' };
	const newState = transactionReducer(initialState, setCurrentTransaction(newTransaction));
	expect(newState.currentTransaction).toEqual(newTransaction);
	});

	it('should handle updating a transaction', () => {
	const existingState = {
		transactions: [{ id: '1', amount: 100, description: 'Test' }],
		transactionLoading: false,
		transactionError: null,
		currentTransaction: null,
	};
	const updatedTransaction = { id: '1', amount: 200, description: 'Updated' };
	const newState = transactionReducer(existingState, updateTransaction(updatedTransaction));
	expect(newState.transactions[0]).toEqual(updatedTransaction);
	});

	it('should handle deleting a transaction', () => {
	const existingState = {
		transactions: [{ id: '1', amount: 100, description: 'Test' }],
		transactionLoading: false,
		transactionError: null,
		currentTransaction: null,
	};
	const newState = transactionReducer(existingState, deleteTransaction('1'));
	expect(newState.transactions).toHaveLength(0);
	});

	it('should handle setting transaction loading state', () => {
	const newState = transactionReducer(initialState, setTransactionLoading(true));
	expect(newState.transactionLoading).toBe(true);
	});

	it('should handle setting transaction error', () => {
	const errorMessage = 'An error occurred';
	const newState = transactionReducer(initialState, setTransactionError(errorMessage));
	expect(newState.transactionError).toBe(errorMessage);
	});
});