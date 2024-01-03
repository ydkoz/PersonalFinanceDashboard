import './database.js';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorHandlers.js';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Personal Finance Dashboard Backend Running');
});

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

//error handler
app.use(errorMiddleware);

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

export default app;