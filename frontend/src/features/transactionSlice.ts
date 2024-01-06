import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../models/Transaction';

interface TransactionState {
	transactions: Transaction[];
	transactionLoading: boolean;
	transactionError: string | null;
	currentTransaction: Transaction | null;
}

const initialState: TransactionState = {
	transactions: [],
	transactionLoading: false,
	transactionError: null,
	currentTransaction: null
};

const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {
		// add new transaction
		addTransaction(state, action: PayloadAction<Transaction>) {
		  state.transactions.push(action.payload);
		},
		// set transactions
		setTransactions(state, action: PayloadAction<Transaction[]>) {
		  state.transactions = action.payload;
		},
		// set current transaction for update/delete
		setCurrentTransaction(state, action: PayloadAction<Transaction | null>) {
		  state.currentTransaction = action.payload;
		},
		// update transaction
		updateTransaction(state, action: PayloadAction<Transaction>) {
		  const index = state.transactions.findIndex(t => t.id === action.payload.id);
		  if (index !== -1) {
			state.transactions[index] = action.payload;
		  }
		},
		// delete transaction
		deleteTransaction(state, action: PayloadAction<string>) {
		  state.transactions = state.transactions.filter(t => t.id !== action.payload);
		},
		// load transaction
		setTransactionLoading(state, action: PayloadAction<boolean>) {
		  state.transactionLoading = action.payload;
		},
		setTransactionError(state, action: PayloadAction<string | null>) {
		  state.transactionError = action.payload;
		}
	},
});

export const {
	addTransaction,
	setTransactions,
	setCurrentTransaction,
	updateTransaction,
	deleteTransaction,
	setTransactionLoading,
	setTransactionError
} = transactionSlice.actions;

export default transactionSlice.reducer;