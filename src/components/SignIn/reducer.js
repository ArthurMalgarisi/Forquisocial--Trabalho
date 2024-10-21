import { SIGN_IN_CHANGE_VALUE, SIGN_IN_CLEAN } from "../../constants/actionTypes";

const INITIAL_STATE = {
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    generalError: '',
    loading: false,
}

const signInReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN_CHANGE_VALUE:
            return {
                ...state,
                [action.property]: action.payload,
                [`${action.property}Error`]: action.error || '',
            }
        case SIGN_IN_CLEAN:
            return { ...state, ...INITIAL_STATE }
        default:
            return state    
    }
}

export default signInReducer;
