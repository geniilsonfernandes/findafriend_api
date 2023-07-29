class ErrorHandler extends Error {
    constructor(public message = 'Internal server error') {
        super(message)
    }
}

class BadRequestError extends ErrorHandler {
    constructor(message = 'Bad request') {
        super(message)
    }
}

class NotFoundError extends ErrorHandler {
    constructor(message = 'Not found') {
        super(message)
    }
}

class UnauthorizedError extends ErrorHandler {
    constructor(message = 'Unauthorized') {
        super(message)
    }
}

class ForbiddenError extends ErrorHandler {
    constructor(message = 'Forbidden') {
        super(message)
    }
}

class UploadError extends ErrorHandler {
    constructor(message = 'Upload error') {
        super(message)
    }
}

export class UserAlreadyExistsError extends ErrorHandler {
    constructor(message = 'User already exists') {
        super(message)
    }
}

export {
    ErrorHandler,
    ForbiddenError,
    UnauthorizedError,
    NotFoundError,
    BadRequestError,
    UploadError
}
