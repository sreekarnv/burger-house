class AppError extends Error {
	statusCode: number;
	status: 'fail' | 'error';

	constructor(message: string, statusCode: number) {
		super();
		this.message = message;
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
	}
}

export default AppError;
