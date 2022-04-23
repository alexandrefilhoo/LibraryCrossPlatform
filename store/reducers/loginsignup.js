import { LOGOUT, VERIFY } from "../actions/loginsignup"

const initialState = {
    token: null,
    userId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case VERIFY:
            return {
                token: action.token,
                userId: action.userId
            }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}