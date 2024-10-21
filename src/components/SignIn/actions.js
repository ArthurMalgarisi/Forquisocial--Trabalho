import { SIGN_IN_CHANGE_VALUE, SIGN_IN_LOADING } from "../../constants/actionTypes";
import { firebase, getReducer } from '../../utils';

export function signIn() {
    return dispatch => {
        const { email, password } = getReducer('signIn');
        let isValid = true;

        if (email === '') {
            isValid = false;
            dispatch({ type: SIGN_IN_CHANGE_VALUE, property: 'emailError', payload: 'Preencha o e-mail' });
        }

        if (password === '') {
            isValid = false;
            dispatch({ type: SIGN_IN_CHANGE_VALUE, property: 'passwordError', payload: 'Preencha a senha' });
        }

        if (isValid) {
            dispatch({ type: SIGN_IN_CHANGE_VALUE, property: 'loading', payload: true });
            firebase.auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    window.location.href = '/';
                })
                .catch(error => {
                    dispatch({ type: SIGN_IN_CHANGE_VALUE, property: 'loading', payload: false });
                    let errorMessage = '';
                    if (error.code === 'auth/network-request-failed') {
                        errorMessage = 'Erro de rede, por favor tente novamente mais tarde.';
                    } else {
                        errorMessage = 'Falha ao entrar, por favor verifique suas credenciais.';
                    }
                    dispatch({ type: SIGN_IN_CHANGE_VALUE, property: 'generalError', payload: errorMessage });
                    console.log("signIn", error);
                });
        }
    }
}

export function sendPasswordResetEmail(email, setEmailSent) {
    return dispatch => {
        firebase.auth.sendPasswordResetEmail(email)
            .then(() => {
                setEmailSent(true);
                dispatch({ type: SIGN_IN_CHANGE_VALUE, property: 'emailError', payload: '' });
            })
            .catch(error => {
                console.log("sendPasswordResetEmail", error);
                dispatch({ type: SIGN_IN_CHANGE_VALUE, property: 'emailError', payload: 'Erro ao enviar email de redefinição' });
            });
    }
}
