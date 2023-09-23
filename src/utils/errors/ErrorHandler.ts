export class ErrorHandlerDefault extends Error {
    statusCode: number

    constructor(code: number, message = 'Not found') {
        super(message)
        this.statusCode = code
    }
}

export class ErrorHandler extends Error {
    constructor(public message = 'Internal server error') {
        super(message)
    }
}

export class BadRequestError extends ErrorHandler {
    constructor(message = 'Bad request') {
        super(message)
    }
}

export class NotFoundError extends ErrorHandlerDefault {
    constructor(code: number, message = 'Not found') {
        super(code, message)
    }
}

export class UnauthorizedError extends ErrorHandler {
    constructor(message = 'Unauthorized') {
        super(message)
    }
}

export class ForbiddenError extends ErrorHandler {
    constructor(message = 'Forbidden') {
        super(message)
    }
}

export class UploadError extends ErrorHandler {
    constructor(message = 'Upload error') {
        super(message)
    }
}

export class AlreadyExistsError extends ErrorHandler {
    constructor(message = 'Already exists') {
        super(message)
    }
}

export class InvalidCredentialsError extends ErrorHandler {
    constructor(message = 'Invalid credentials') {
        super(message)
    }
}
