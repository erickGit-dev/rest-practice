export const config = {
    signUpURL: process.env.REACT_APP_SIGN_UP_URL ||  "http://localhost:3001/api/v0/sign-up/", 
    logInURL: process.env.REACT_APP_LOG_IN_URL ||  "http://localhost:3001/api/v0/log-in/",
    logOutURL: process.env.REACT_APP_LOG_OUT_URL || "http://localhost:3001/api/v0/log-out/" 
};