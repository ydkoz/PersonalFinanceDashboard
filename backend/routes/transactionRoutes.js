import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js'
import Transaction from '../models/Transaction.js';

dotenv.config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET

async function verifyUser(jwtToken, next) {
	try {
		const jwtData = jwt.verify(jwtToken, JWT_SECRET);
		const date = Date.now() / 1000;
		if (jwtData.exp < date) {
			const error = new Error("JWT Token Expired");
			error.status("401");
			throw error;
		}

		const user = await User.findOne({_id: jwtData.userId});
		if (user) {
			return user._id;
		} else {
			const error = new Error("User not found");
			error.status("401");
			throw error;
		}
	} catch(err) {
		next(err);
	}

};

router.get('/', async (req, res, next) => {
	try {
		const data = req.body;
		const userId = await verifyUser(req.headers.authorization);
		let transactions = await Transaction.find(
			{
				userid: userId
			}
		);
		if (transactions) {
			res.status(200).json({"message":"Transactions found","transactions":transactions});
		} else {
			res.status(404).json({"message": `Transactions not found`});
		}
	} catch(err) {
		next(err);
	}
});

router.get('/:transactionid', async (req, res, next) => {
	try {
		const data = req.body;
		const userId = await verifyUser(req.headers.authorization);
		let transaction;
		const validId = mongoose.Types.ObjectId.isValid(req.params.transactionid);
		if (validId) {
			transaction = await Transaction.findOne(
				{
					_id: req.params.transactionid,
					userid: userId
				}
			);
		};
		if(transaction) {
			res.status(200).json({"message":"Transaction found", "transaction":transaction});
		} else {
			res.status(404).json({"message": `Transaction not found`});
		}
	} catch(err) {
		next(err);
	}
});

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

router.delete('/', async (req, res, next) => {
	try {
		const data = req.body;
		const userId = await verifyUser(req.headers.authorization);
		let plural = ""
		let result = "";
		if(data.deleteall == 'true') {
			result = await Transaction.deleteMany(
				{
					userid: userId
			});
			plural = "s"
		} else {
			result = await Transaction.deleteOne(
				{
				_id: data.transactionid,
				userid: userId
			});

		}
		if(result.deletedCount > 0) {
			res.status(200).json({"message":`Transaction${plural} deleted successfully`});
		} else {
			res.status(404).json({"message":`No transaction${plural} found to delete`});
		}
	} catch(err) {
		next(err);
	}
});

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