import { SIGN_UP_CHANGE_EMAIL, SIGN_UP_CHANGE_NAME, SIGN_UP_CHANGE_PASSWORD, SIGN_UP_CHANGE_PHONE, SIGN_UP_CHANGE_SHOWDIALOG, SIGN_UP_CHANGE_JOB_TITLE, SIGN_UP_CHANGE_DATANASCIMENTO, SIGN_UP_CHANGE_CPF, SIGN_UP_CHANGE_ORGAO, SIGN_UP_CHANGE_CONFIRMPASSWORD } from "../../constants/actionTypes";
import { getReducer } from '../../utils';
import { firebase } from '../../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function signUp(navigate) {  // Adiciona navigate como parâmetro
    return dispatch => {
        if(validateInputs(dispatch)){
            const { name, email, phone, password, jobTitle, dataNascimento, orgao, cpf } = getReducer('signUp');
            firebase.auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log("signUp" ,user);
              const userData = {
                  accessControl: {
                      adm: false,
                      readyOnly: false,
                      situation: 'Inativo'
                  },
                  email,
                  avatarUrl: '',
                  name,
                  phone,
                  orgao,
                  dataNascimento,
                  cpf,
                  jobTitle,
                  uid: user.uid
              };
              firebase.firestore.doc(`users/${user.uid}`).set(userData)
              .then(() => {
                dispatch({ type: SIGN_UP_CHANGE_SHOWDIALOG, payload: true });
                toast.success('Cadastro realizado com sucesso! Aguarde a liberação do administrador.');
                window.location.href = '/login';
              }) 
              .catch(error => {
                  console.log("signUp", error);
                  toast.error('Erro ao salvar os dados do usuário.');
              });
            })
            .catch(error => {
                console.log("signUp", error);
                toast.error('Erro ao realizar o cadastro.');
            });
        }
    }
}

function validateInputs(dispatch) {
    const { name, email, phone, password, jobTitle, orgao, cpf, dataNascimento, confirmPassword } = getReducer('signUp');
    let isValid = true;

    if (name === '') {
        isValid = false;
        dispatch({ type: SIGN_UP_CHANGE_NAME, payload: name, error: 'Preencha o nome' });
    }

    if (email === '') {
        isValid = false;
        dispatch({ type: SIGN_UP_CHANGE_EMAIL, payload: email, error: 'Preencha o e-mail' });
    }

    if (orgao === '') {
        isValid = false;
        dispatch({ type: SIGN_UP_CHANGE_ORGAO, payload: orgao, error: 'Preencha o seu setor' });
    }
    if (cpf === '') {
        isValid = false;
        dispatch({ type: SIGN_UP_CHANGE_CPF, payload: cpf, error: 'Preencha o seu CPF' });
    }
    if (dataNascimento === '') {
        isValid = false;
        dispatch({ type: SIGN_UP_CHANGE_DATANASCIMENTO, payload: dataNascimento, error: 'Preencha a sua data de nascimento' });
    }

    if (phone === '') {
        isValid = false;
        dispatch({ type: SIGN_UP_CHANGE_PHONE, payload: phone, error: 'Preencha o telefone' });
    }

    if (password === '') {
        isValid = false;
        dispatch({ type: SIGN_UP_CHANGE_PASSWORD, payload: password, error: 'Preencha a senha' });
    }

    if (jobTitle === '') {
        isValid = false;
        dispatch({ type: SIGN_UP_CHANGE_JOB_TITLE, payload: jobTitle, error: 'Preencha o cargo' });
    }

    if (confirmPassword === '') {
        isValid = false;
        dispatch({ type: SIGN_UP_CHANGE_CONFIRMPASSWORD, payload: confirmPassword, error: 'Preencha sua senha novamente' });
    }

    if (password !== confirmPassword) {
        isValid = false;
        dispatch({ type: SIGN_UP_CHANGE_CONFIRMPASSWORD, payload: confirmPassword, error: 'As senhas não conferem' });
    }

    return isValid;
}