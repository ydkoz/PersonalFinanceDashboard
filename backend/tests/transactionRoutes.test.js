import request from 'supertest';
import app from '../server.js';

describe('User Registration and Login', () => {

	let jwtToken = ''
	let transactionId = ''

	test('Get jwt token with response code 200 for user login', async() => {
		const response = await request(app)
		.post('/api/users/login')
		.send({
			username: 'testuser2',
			password: 'password123'
		});
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe("Login successful");
		expect(response.body.user.email).toBe("test@example.com");
		jwtToken = response.body.user.token;
	});

	test('Expect response code 201 for successful transaction add', async () => {
		const response = await request(app)
		.post('/api/transactions')
		.send({
			jwttoken: jwtToken,
			amount: '10',
			type: 'expense',
			category: 'entertainment',
			description: 'movies'
		});
		transactionId = response.body.transaction._id;
		expect(response.statusCode).toBe(201);
		expect(response.body.message).toBe('Transaction added successfully');
	});

	test('Expect response code 201 for successful transaction add', async () => {
		const response = await request(app)
		.post('/api/transactions')
		.send({
			jwttoken: jwtToken,
			amount: '20',
			type: 'expense',
			category: 'food',
			description: 'dinner'
		});
		transactionId = response.body.transaction._id;
		expect(response.statusCode).toBe(201);
		expect(response.body.message).toBe('Transaction added successfully');
	});

	test('Expect response code 201 for successful transaction add', async () => {
		const response = await request(app)
		.post('/api/transactions')
		.send({
			jwttoken: jwtToken,
			amount: '50',
			type: 'expense',
			category: 'utilities',
			description: 'gas bill'
		});
		transactionId = response.body.transaction._id;
		expect(response.statusCode).toBe(201);
		expect(response.body.message).toBe('Transaction added successfully');
	});

	test('Expect response code 200 for successful transaction get all', async () => {
		const response = await request(app)
		.get('/api/transactions')
		.send({
			jwttoken: jwtToken,
			transactionid: transactionId,
			getall: 'true'
		});
		//transactionId = response.body.transaction._id;
		console.log(response.body);
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Transactions found');
	});

	test('Expect response code 200 for successful transaction get', async () => {
		const response = await request(app)
		.get('/api/transactions')
		.send({
			jwttoken: jwtToken,
			transactionid: transactionId
		});
		transactionId = response.body.transaction._id;
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Transaction found');
	});

	test('Expect response code 200 for successful transaction update', async () => {
		const response = await request(app)
		.put('/api/transactions')
		.send({
			jwttoken: jwtToken,
			transactionid:transactionId,
			category: 'entertainment',
			description: 'movies update'
		});
		expect(response.body.transaction._id).toBe(transactionId);
		expect(response.body.transaction.description).toBe("movies update");
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Transaction updated successfully');
	});

	test('Expect response code 200 for successful transaction delete', async () => {
		const response = await request(app)
		.delete('/api/transactions')
		.send(
			{
				jwttoken: jwtToken,
				transactionid:transactionId
		});
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Transaction deleted successfully');
	});
	
	test('Expect response code 404 for unsuccessful transaction delete', async () => {
		const response = await request(app)
		.delete('/api/transactions')
		.send(
			{
				jwttoken: jwtToken,
				transactionid:transactionId,
		});
		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe('No transaction found to delete');
	});

	test('Expect response code 200 for successfull transaction delete all', async () => {
		const response = await request(app)
		.delete('/api/transactions')
		.send({
			jwttoken: jwtToken,
			deleteall: 'true'
		});
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Transactions deleted successfully');
	});

	test('Expect response code 404 for failed transaction delete all', async () => {
		const response = await request(app)
		.delete('/api/transactions')
		.send({
			jwttoken: jwtToken,
			deleteall: 'true'
		});
		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe('No transactions found to delete');
	});

});