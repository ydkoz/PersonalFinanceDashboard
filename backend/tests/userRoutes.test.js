import request from 'supertest';
import app from '../server.js';

describe('User Registration and Login', () => {

	test('Expect response code 201 for successful registration', async () => {
		const response = await request(app)
		.post('/api/users/register')
		.send({
			firstname: 'Test',
			lastname: 'User',
			email: 'test@example.com',
			username: 'testuser',
			password: 'password123'
		});
		expect(response.statusCode).toBe(201);
		expect(response.body.message).toBe('Registered successfully');
	});

	test('Expect response code 409 for duplicate username', async () => {
		const response = await request(app)
		.post('/api/users/register')
		.send({
			firstname: 'Test',
			lastname: 'User',
			email: 'test@example.com',
			username: 'testuser',
			password: 'password123'
		});
		expect(response.statusCode).toBe(409);
		expect(response.body.error).toBe('Username already exists');
	});

	test('Expect response code 200 for user login', async() => {
		const response = await request(app)
		.post('/api/users/login')
		.send({
			username: 'testuser',
			password: 'password123'
		});
		expect(response.statusCode).toBe(200);
		expect(response.body.email).toBe("test@example.com");
		console.log(response.body);
	});


	test('Expect response code 200 for deleting previously added user', async () => {
		const response = await request(app)
		.delete('/api/users')
		.send({
			firstname: 'Test',
			lastname: 'User',
			email: 'test@example.com',
			username: 'testuser',
			password: 'password123'
		});
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('User deleted successfully');
	});

});