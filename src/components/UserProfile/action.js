import { USERS_CHANGE_CHILD_VALUE, USERS_CHANGE_VALUE, USERS_CHANGE_USERDATA_CHILD_VALUE, USER_LOGGED_OUT, USER_LOGGED_IN, USERS_CHANGE_USERDATA  } from '../../constants/actionTypes';
import { firebase, getReducer } from "../../utils";

export function changeVisibleDetailsDialog(show, data) {
    return dispatch => { 
        dispatch({ type: USERS_CHANGE_VALUE, property: 'showDetails', payload: show })
        dispatch({ type: USERS_CHANGE_VALUE, property: 'edit', payload: true})
        if (show) dispatch({ type: USERS_CHANGE_VALUE, property: 'userData', payload: data})
        else setTimeout(() => { dispatch({ type: USERS_CHANGE_VALUE, property: 'userData', payload: null }) }, 250)
    }
}

export function loadUsersList() {
    return dispatch => {
        firebase.firestore.collection('users').get()
        .then(snap => {
            const data = snap.docs.map(doc => doc.data())
            dispatch({ type: USERS_CHANGE_VALUE, property: 'userList', payload: data})
        })
        .catch(error => {
            console.log("loadUsersList" ,error)
        })
    }
}

export function editUsersList(data) {
    return dispatch => {
        firebase.firestore.doc(`users/${data.uid}`).update(data)
        .then(() => {
            const userList = getReducer("users", "userList")
            let updateList = JSON.parse(JSON.stringify(userList))
            updateList = updateList.map(users =>  users.uid === data.uid ? data : users)
            dispatch({ type: USERS_CHANGE_VALUE, property: 'userList', payload: updateList })
            dispatch(changeVisibleDetailsDialog(false))
        })
        .catch(error => {
            console.log("editUsersList", error)
        })
    }
}

export function deleteUsers(data) {
    return dispatch => {
        firebase.firestore.doc(`users/${data.uid}`).delete()
        .then(() => {
            const userList = getReducer("users", "userList")
            let updateList = JSON.parse(JSON.stringify(userList))
            updateList = updateList.filter(users => users.uid !== data.uid)
            dispatch({ type: USERS_CHANGE_VALUE, property: 'userList', payload: updateList })
            dispatch(changeVisibleDetailsDialog(false))
        })
        .catch(error => {
            console.log("deleteUsers", error)
        })
    }
}

export function loadLoggedUser() {
    return dispatch => {
        const user = firebase.auth.currentUser;

        if (!user) {
            dispatch({ type: USER_LOGGED_OUT });
            return;
        }

        firebase.firestore.collection('users').doc(user.uid).get()
        .then(doc => {
            const data = doc.data();

            if (!doc.exists || data.accessControl.situation !== "Ativo") {
                firebase.auth.signOut()
                .then(() => {
                    console.log('Os dados da sua conta não existem ou a conta está inativa. Deslogando...');
                    dispatch({ type: USER_LOGGED_OUT });
                })
                .catch(error => {
                    console.error('Erro ao deslogar:', error);
                });
            } else {
                // Dados do usuário carregados com sucesso, dispare a ação de usuário logado
                dispatch({ type: USER_LOGGED_IN, payload: data });
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados do usuário:", error);
            // Trate o erro conforme necessário
        });
    };
}


export function updateUserProfile(updatedProfile) {
    return dispatch => {
        const { uid, ...profileData } = updatedProfile;

        firebase.firestore.collection('users').doc(uid).set(profileData, { merge: true })
        .then(() => {
            dispatch({ type: 'USERS_CHANGE_USERDATA', payload: updatedProfile });
            console.log('User profile updated successfully!');
        })
        .catch(error => {
            console.error('Error updating user profile:', error);
        });
    };
}
