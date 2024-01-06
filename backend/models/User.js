import mongoose from 'mongoose';

// User schema for mongoose database
// will have a unique id as _id in the database
const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		maxlength: 30
	},
	lastname: {
		type: String,
		required: true,
		maxlength: 30
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	hashedpassword: {
		type: String,
		required: true
	},
});

const User = mongoose.model('User', userSchema);

export default User;