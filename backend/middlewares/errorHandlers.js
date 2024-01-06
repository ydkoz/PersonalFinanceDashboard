//handle errors in expressjs
export default function errorMiddleware(err, req, res, next) {
	const status = err.status || 500;
	const message = err.message || 'Internal server error';

	return res.status(status).json({'message':message});
}