import mongoose from 'mongoose';

// Transaction schema for mongoose database
// will have a unique id as _id in the database
const transactionSchema = new mongoose.Schema({
	userid: {
		type: mongoose.Schema.Types.ObjectId,
		required:true
	},
	amount: {
		type: Number,
		required:true
	},
	date: {
		type: Date,
		default: Date.now
	},
	type: {
		type: String,
		required:true,
		enum: ['income','expense']
	},
	category: {
		type: String
	},
	description:{
		type: String
	}
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;