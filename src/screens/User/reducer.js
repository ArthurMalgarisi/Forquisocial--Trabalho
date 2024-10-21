import { APP_CHANGE_VALUE, SHOW_ALERT_MESSAGE } from '../../constants/actionTypes';

const INITIAL_STATE = {
    user: null,
}

const appReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_CHANGE_VALUE:
            if (action.property === 'user' && !action.payload) {
                // Se o usuário for nulo, isso indica que o usuário foi desconectado
                // Despachar a ação para exibir a mensagem de sucesso
                return {
                    ...state,
                    [action.property]: action.payload
                }
            }
            return {
                ...state,
                [action.property]: action.payload
            };
        default:
            return state;
    }
}

export default appReducer;
