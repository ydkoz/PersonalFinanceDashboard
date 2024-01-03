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

router.delete('/', async (req, res, next) => {
	try {
		const data = req.body;
		const deletedUser = await User.findOneAndDelete({ username: data.username});
		if(!deletedUser) {
			return res.status(404).json({"message":"User not found"});
		}
		res.status(200).json({"message":"User deleted successfully"});
	} catch (err) {
		//console.log(err);
		next(err);
	}
})

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
			//console.log(addedUser);
			res.status(201).json({"message":"Registered successfully"});
		}
	} catch(err) {
		//console.log(err);
		next(err);
	}
});

router.post('/login', async (req, res, next) => {
	try {
		const data = req.body;
		const user = await User.findOne({username:data.username});
		if (user && await bcrypt.compare(data.password, user.hashedpassword)) {
			const jwtToken = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRATION_TIME});
			const userInfo = {
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				token: jwtToken
			}

			//testing details
			//console.log("login here");
			//console.log(jwtToken);
			//const userjwt = (jwt.verify(jwtToken, JWT_SECRET))
			//console.log(userjwt);
			//const user2 = await User.findOne({_id:userjwt.userId});
			//console.log(user2);
			//testing details
			
			res.status(200).json({"message":"Login successful","user":userInfo});
		} else {
			res.status(401).json({"message": "Username and/or password incorrect"});
		}
	} catch (err) {
		//console.log(err);
		next(err);
	}
});

export default router;