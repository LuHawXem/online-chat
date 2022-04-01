import { mockLogin, mockLogout } from "./Mock";
import { realLogin, realLogout } from "./Authentic";
import Conf from '../../config.json'

function login(username, password) {
  if(Conf.useMock) return mockLogin(username, password)
  return realLogin(username, password)
}

function logout(sessionId) {
  if(Conf.useMock) return mockLogout(...arguments);
  return realLogout(...arguments)
}

export { login, logout }
