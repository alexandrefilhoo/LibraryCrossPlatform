import AsyncStorage from '@react-native-async-storage/async-storage'
export const VERIFY = 'VERIFY'
export const LOGOUT = 'LOGOUT';


export const authenticate = (userId, token) => {
    return { type: VERIFY, userId: userId, token: token }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIifsehbkDOj3K1VbRNJ8_C1Sg6_9Q3-0',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

        if (!response.ok) {
            const errorResponseData = await response.json()
            const errorId = errorResponseData.error.message;
            let message = 'Make sure the fields are not left empty.'

            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email is already registered in our records. Try a different email.'
            }
            throw new Error(message)
        }
        const responseData = await response.json()
        console.log(responseData)

        dispatch(authenticate(responseData.localId, responseData.idToken))

        const dateToBeExpired = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000)
        saveDataToStorage(responseData.idToken, responseData.localId, dateToBeExpired)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIifsehbkDOj3K1VbRNJ8_C1Sg6_9Q3-0',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

        if (!response.ok) {
            const errorResponseData = await response.json()
            const errorId = errorResponseData.error.message;
            let message = 'Make sure the fields are not left empty.'

            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email is not registered in our records. Try again.'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Invalid password. Try again'
            }
            throw new Error(message)
        }  
        const responseData = await response.json()
        console.log(responseData)

        dispatch(authenticate(responseData.localId, responseData.idToken))
        const dateToBeExpired = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000)
        saveDataToStorage(responseData.idToken, responseData.localId, dateToBeExpired)
    }
}
export const logout = () => {
    return { type: LOGOUT }
}
const saveDataToStorage = (token, userId, dateToBeExpired) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: dateToBeExpired.toISOString()
    }))
}