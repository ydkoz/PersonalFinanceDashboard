import { api } from './api';
import { Dispatch } from 'redux';
import {
	addTransaction,
	setTransactions,
	setCurrentTransaction,
	updateTransaction,
	deleteTransaction,
	setTransactionLoading,
	setTransactionError,
} from '../features/transactionSlice';
import { Transaction } from '../models/Transaction';

export const getTransactions = () => async (dispatch: Dispatch) => {
	try {
		dispatch(setTransactionLoading(true));
		const response = await api.get('/transactions/');
		const transactions = response.data.transactions;
		dispatch(setTransactions(transactions));
		dispatch(setTransactionLoading(false));
	} catch(error: any) {
		dispatch(setTransactionError(error.response?.data?.message || 'An error occurred'));
	}
};

export const addNewTransaction = (transactionData: Transaction) => async (dispatch: Dispatch) => {
	try {
		const response = await api.post('/transactions/', transactionData);
		const addedTransaction = response.data.transaction;
		dispatch(addTransaction(addedTransaction));
	} catch(error: any) {
		dispatch(setTransactionError(error.response?.data?.message || 'An error occurred'));
	}
};

export const deleteTransactionById = (transactionId: string) => async (dispatch: Dispatch) => {
	try {
		await api.delete(`/transactions/${transactionId}`);
		dispatch(deleteTransaction(transactionId));
	} catch(error: any) {
		dispatch(setTransactionError(error.response?.data?.message || 'An error occurred'));
	}
};

export const updateTransactionById =
	(transactionId: string, updatedData: Transaction) => async (dispatch: Dispatch) =>  {
	try {
		const response = await api.put(`/transactions/${transactionId}`, updatedData);
		const updatedTransaction = response.data.transaction;
		dispatch(updateTransaction(updatedTransaction));
	} catch(error: any) {
		dispatch(setTransactionError(error.response?.data?.message || 'An error occurred'));
	}
}

export const setCurrentTransactionById =
	(transactionId: string) => async (dispatch: Dispatch) => {
	try {
		dispatch(setTransactionLoading(true));
		const response = await api.get(`/transactions/${transactionId}`);
		const currentTransaction = response.data.transaction;
		dispatch(setCurrentTransaction(currentTransaction));
		dispatch(setTransactionLoading(false));
	} catch(error: any) {
		dispatch(setTransactionError(error.response?.data?.message || 'An error occurred'));
	}
}