import { APP_CHANGE_VALUE } from "../../constants/actionTypes";
import { firebase } from "../../utils";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function loadUserData(user, navigate) {
    return dispatch => {
        if (!user) {
            dispatch({ type: APP_CHANGE_VALUE, property: 'user', payload: {} });
            return;
        }
        firebase.firestore.collection('users').doc(user.uid).get()
        .then(doc => {
            const data = doc.data();
            console.log("loadUserData", data);

            if (!doc.exists) {
                toast.error('Os dados da sua conta não existem.');
                dispatch(logOff(navigate)); // Pass navigate to logOff
                return;
            }

            if (data.accessControl.situation !== "Ativo") {
                toast.success('Cadastro realizado com sucesso!');
                toast.success('So aguardar o administrador do sistema liberar o seu acesso!');
                return;
            }

            dispatch({ type: APP_CHANGE_VALUE, property: 'user', payload: data });

        })
        .catch(error => {
            console.log("loadUserData", error);
        });
    };
}

export const logOff = (navigate) => {
    return dispatch => {
        firebase.auth.signOut()
        .then(() => {
            dispatch({ type: APP_CHANGE_VALUE, property: 'user', payload: {} });
            console.log("Deslogado com sucesso.");
            setTimeout(() => {
                window.location.href = '/'
            }, 1000)        })
        .catch(error => {
            console.log("ERROR AO DESLOGAR", error);
        });
    };
};
