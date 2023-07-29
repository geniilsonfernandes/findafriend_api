class ErrorHandler extends Error {
    constructor(public message = 'Internal server error') {
        super(message)
    }
}

export { ErrorHandler }
