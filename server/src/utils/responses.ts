export const responses = {
    serverError: {
        INTERNAL_SERVER: 'Internal server error',
    },
    singUp: {
        EMAIL_EXIST: 'Email already exist',
        USER_ADDED_CORRECTLY: 'User added correctly',
    },
    logIn: {
        INCORRECT_CREDENTIALS: 'Incorrect credentials',
        DONE_RESPONSE: 'Login successfully'
    },
    logOut: {
        NO_TOKEN: 'No token provided',
        NO_AUTORTHIZATION: 'No authorization',
        LOGOUT_SUCCESSFULLY: 'Logout successfully'
    },
    updateUser: {
        USER_UPDATED_CORRECTLY: 'User updated correctly',
        DOCUMENT_DONT_FOUND: 'Document not found'
    },
    deleteUser: {
        INVALID_ID_FORMAT: 'Invalid ID format',
        USER_NOT_FOUND: 'User not found',
        USER_DELETE_SUCCESSFULY: 'User deleted successfully',
    }
} 
