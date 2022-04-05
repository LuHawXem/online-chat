import Conf from '../../config.json'

function mockRegister(nickname, password) {
  return new Promise((resolve) => {
    resolve({
      'msg': 'mock data returned',
      'account': Conf.mockData.login.account
    })
  })
}

function mockLogin(account, password) {
  const { login } = Conf.mockData
  return new Promise((resolve, reject) => {
    if(account === login.account && password === login.password) {
      resolve({
        'msg': 'mock data returned',
        'token': login.token,
        'avatar': login.avatar,
        'nickname': login.nickname
      })
    }
    else {
      reject({
        'msg': 'account or password is wrong'
      })
    }
  })
}

function mockLogout(token) {
  return new Promise((resolve, reject) => {
    const { login } = Conf.mockData
    if(token === login.token) {
      resolve({
        'msg': 'user is logout'
      })
    }
    else {
      reject({
        'msg': 'something wrong'
      })
    }
  })
}

export { mockRegister, mockLogin, mockLogout }
