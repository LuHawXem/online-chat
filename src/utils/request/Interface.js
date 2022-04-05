import { mockLogin, mockLogout, mockRegister } from "./Mock";
import { realLogin, realLogout, realRegister } from "./Authentic";
import Conf from '../../config.json'

function register(nickname, password) {
  if (Conf.useMock) return mockRegister(...arguments)
  return realRegister(...arguments)
}

function login(account, password) {
  if (Conf.useMock) return mockLogin(...arguments)
  return realLogin(...arguments)
}

function logout(token) {
  if (Conf.useMock) return mockLogout(...arguments);
  return realLogout(...arguments)
}

export {register, login, logout}
