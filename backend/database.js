import mongoose from 'mongoose';

const dbUri = process.env.MONDOGB_URI || 'mongodb://localhost:27017/pfd-db'
mongoose.connect(dbUri);

mongoose.connection.on('connected', () =>
	console.log('connected to database')
);

mongoose.connection.on('error', err => {
	logError(err);
});
