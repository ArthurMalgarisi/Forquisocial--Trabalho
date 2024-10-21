import { SIGN_UP_CHANGE_EMAIL, SIGN_UP_CHANGE_NAME, SIGN_UP_CHANGE_PASSWORD, SIGN_UP_CHANGE_PHONE, SIGN_UP_CHANGE_SHOWDIALOG, SIGN_UP_CHANGE_CONFIRMPASSWORD, SIGN_UP_CHANGE_JOB_TITLE, SIGN_UP_CHANGE_CPF, SIGN_UP_CHANGE_ORGAO, SIGN_UP_CHANGE_DATANASCIMENTO, SIGN_UP_SUCCESS } from "../../constants/actionTypes";

const INITIAL_STATE = {
    name: '',
    nameError:'',
    email: '',
    emailError: '',
    phone: '',
    phoneError:'',
    password: '',
    passwordError:'',
    jobTitle: '',
    jobTitleError:'',
    orgao:'',
    orgaoError:'',
    cpf:'',
    cpfError:'', // Corrigido para cpfError
    dataNascimento:'',
    dataNascimentoError:'', // Corrigido para dataNascimentoError
    confirmPassword:'', // Corrigido para dataNascimentoError
    confirmPasswordError:'', // Corrigido para dataNascimentoError
    showDialog:false,
}

const signUp = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_UP_CHANGE_NAME:
            return {
                ...state,
                name: action.payload,
                nameError: action.error    
            }
        case SIGN_UP_CHANGE_EMAIL:
            return {
                ...state,
                email: action.payload,
                emailError: action.error
            }
        case SIGN_UP_CHANGE_PHONE:
            return {
                ...state,
                phone: action.payload,
                phoneError: action.error
            }
        case SIGN_UP_CHANGE_PASSWORD:
            return {
                ...state,
                password: action.payload,
                passwordError: action.error
            }
        case SIGN_UP_CHANGE_JOB_TITLE:
            return {
                ...state,
                jobTitle: action.payload,
                jobTitleError: action.error
            }
        case SIGN_UP_CHANGE_CPF:
            return {
                ...state,
                cpf: action.payload,
                cpfError: action.error
            }
        case SIGN_UP_CHANGE_ORGAO:
            return {
                ...state,
                orgao: action.payload,
                orgaoError: action.error
            }
        case SIGN_UP_CHANGE_DATANASCIMENTO:
            return {
                ...state,
                dataNascimento: action.payload,
                dataNascimentoError: action.error
            }
        case SIGN_UP_CHANGE_CONFIRMPASSWORD:
            return {
                ...state,
                confirmPassword: action.payload,
                confirmPasswordError: action.error
            }
        case SIGN_UP_CHANGE_SHOWDIALOG:
            return {
                ...state,
                showDialog: action.payload,
            }
            case SIGN_UP_SUCCESS:
                return {
                    ...state,
                    showDialog: true,
                    // Se necessário, você pode limpar os campos aqui
                }
        default:
            return state
    }
}

export default signUp;
