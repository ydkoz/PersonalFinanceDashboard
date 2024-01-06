import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Transaction from '../models/Transaction.js';
import { verifyUser } from './userRoutes.js'

dotenv.config();
const router = express.Router();

// handles api get request
// returns all transactions for a specific user
router.get('/', async (req, res, next) => {
	try {
		const userId = await verifyUser(req.headers.authorization);
		let transactions = await Transaction.find({
				userid: userId
		});
		if (transactions) {
			res.status(200).json({"message":"Transactions found","transactions":transactions});
		} else {
			res.status(404).json({"message": `Transactions not found`});
		}
	} catch(err) {
		next(err);
	}
});

// handles api get request for single transaction
// returns transaction details for transactionid
// requires jwt authorization header
router.get('/:transactionid', async (req, res, next) => {
	try {
		const userId = await verifyUser(req.headers.authorization);
		let transaction;
		const validId = mongoose.Types.ObjectId.isValid(req.params.transactionid);
		if (validId) {
			transaction = await Transaction.findOne({
				_id: req.params.transactionid,
				userid: userId
			});
		}
		if(transaction) {
			res.status(200).json({"message":"Transaction found", "transaction":transaction});
		} else {
			res.status(404).json({"message": `Transaction not found`});
		}
	} catch(err) {
		next(err);
	}
});

// handles post request to add a new transaction
// then returns transaction details if successfully added to database
// requires jwt authorization header
router.post('/', async (req, res, next) => {
	try {
		const data = req.body;
		const userId = await verifyUser(req.headers.authorization);
		const newTransaction = new Transaction({
			userid: userId,
			amount: data.amount,
			date: data.date,
			type: data.type,
			category: data.category,
			description: data.description
		});
		const addedTransaction = await newTransaction.save();
		if (addedTransaction) {
			res.status(201).json(
				{
				"message":"Transaction added successfully",
				"transaction":addedTransaction
			});
		}
	} catch(err) {
		next(err);
	};
});

// handles delete request to delete all transactions for a single user
// requires jwt authorization header
router.delete('/', async (req, res, next) => {
	try {
		const data = req.body;
		const userId = await verifyUser(req.headers.authorization);
		const result = await Transaction.deleteMany(
			{
				userid: userId
		});
		if(result.deletedCount > 0) {
			res.status(200).json({"message":`Transactions deleted successfully`});
		} else {
			res.status(404).json({"message":`No transactions found to delete`});
		}
	} catch(err) {
		next(err);
	}
});

// handles delete request for a single transaction
// requires jwt authorization header
router.delete('/:transactionid', async (req, res, next) => {
	try {
		const userId = await verifyUser(req.headers.authorization);
		const validId = mongoose.Types.ObjectId.isValid(req.params.transactionid);
		let result;
		if(validId) {
			result = await Transaction.deleteOne(
				{
				_id: req.params.transactionid,
				userid: userId
			});
		}
		if(result.deletedCount > 0) {
			res.status(200).json({"message":`Transaction deleted successfully`});
		} else {
			res.status(404).json({"message":`Transaction not found`});
		}
	} catch(err) {
		next(err);
	}
});

// handles updating a transaction
// requires jwt authorization header
router.put('/', async (req, res, next) => {
	try {
		const data = req.body;
		const userId = await verifyUser(req.headers.authorization);

		let updatedData = {};
		if ('amount' in data) {
			updatedData.amount = data.amount;
		}
		if ('date' in data) {
			updatedData.date = data.date;
		}
		if ('category' in data) {
			updatedData.category = data.category;
		}
		if ('description' in data) {
			updatedData.description = data.description;
		}
		
		const transaction = await Transaction.findOneAndUpdate(
			{
				_id: data.transactionid,
				userid: userId
			},
				updatedData,
			{
				returnOriginal: false
			});
		if (transaction) {
			res.status(200).json({
				"message":"Transaction updated successfully",
				"transaction":transaction,
			});
		}
	} catch(err) {
		next(err);
	}
});

export default router;