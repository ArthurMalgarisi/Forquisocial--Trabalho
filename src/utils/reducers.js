import { combineReducers } from 'redux'
import signUp from '../components/SignUp/reducer'
import signIn from '../components/SignIn/reducer'
import avisos from '../components/Avisos/reducer'
import servicos from '../components/Servicos/reducer'
import users from '../components/User/reducer'
import atendimentosSetor from '../components/AtendimentosSetor/reducer'
import atendimentos from '../components/Atendimento/reducer'
import appReducer from '../screens/User/reducer'
import galeria from '../components/Galeria/reducer'

export default combineReducers ({
    signUp,
    signIn,
    avisos,
    galeria,
    atendimentos,
    atendimentosSetor,
    servicos,
    users,
    appReducer,
})