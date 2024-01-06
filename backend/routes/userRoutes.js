import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

dotenv.config();
const router = express.Router();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME

// verifies jwt token is valid an not expired
// used before processing transaction requests
export async function verifyUser(jwtToken, next) {
	try {
		const token = jwtToken.startsWith('Bearer ') ? jwtToken.split(' ')[1] : jwtToken;
		const jwtData = jwt.verify(token, JWT_SECRET);
		const date = Date.now() / 1000;
		if (jwtData.exp < date) {
			const error = new Error("JWT Token Expired");
			error.status("401");
			throw error;
		}

		const user = await User.findOne({ _id: jwtData.userId });
		if (user) {
			return user;
		} else {
			const error = new Error("User not found");
			error.status = 401;
			throw error;
		}
	} catch (err) {
		next(err);
	}
};

// deletes user
// no authorization because it is for dev testing only
// ahould be removed completely for productino, or implement authorization
router.delete('/', async (req, res, next) => {
	try {
		const data = req.body;
		const deletedUser = await User.findOneAndDelete({ username: data.username});
		if(!deletedUser) {
			return res.status(404).json({"message":"User not found"});
		}
		res.status(200).json({"message":"User deleted successfully"});
	} catch (err) {
		next(err);
	}
})

// handles user registration process
// user should be forwarded to login page on success
router.post('/register', async (req, res, next) => {
	try {
		const data = req.body;
		const existingUser = await User.findOne({username:data.username});
		if(existingUser) {
			return res.status(409).json({"message":"Username already exists"});
		}
		const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
		const newUser = new User({
			firstname: data.firstname,
			lastname: data.lastname,
			email: data.email,
			username: data.username,
			hashedpassword: hashedPassword
		});
		const addedUser = await newUser.save();
		if (addedUser) {
			res.status(201).json({"message":"Registered successfully"});
		}
	} catch(err) {
		next(err);
	}
});

// handles user login
// compares hashed password and returns JWT for authorization on transaction requests
router.post('/login', async (req, res, next) => {
	try {
		const data = req.body;
		const user = await User.findOne({username:data.username});
		if (user && await bcrypt.compare(data.password, user.hashedpassword)) {
			const jwtToken = 
				jwt.sign(
					{userId: user._id}, JWT_SECRET,
					{expiresIn: JWT_EXPIRATION_TIME});

			const userInfo = {
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				username: user.username,
				token: jwtToken
			}

			res.status(200).json({"message":"Login successful","user":userInfo});
		} else {
			res.status(401).json({"message": "Username and/or password incorrect"});
		}
	} catch (err) {
		next(err);
	}
});

export default router;