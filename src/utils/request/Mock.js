import Conf from '../../config.json'

function mockLogin(username, password) {
  const { login } = Conf.mockData
  return new Promise((resolve, reject) => {
    if(username === login.username && password === login.password) {
      resolve({
        'msg': 'mock data returned',
        'session_id': login.session_id,
        'avatar': login.avatar,
        'nickname': login.nickname
      })
    }
    else {
      reject({
        'msg': 'username or password is wrong'
      })
    }
  })
}

function mockLogout(sessionId) {
  return new Promise((resolve, reject) => {
    if(Number(sessionId) === 114514) {
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

export { mockLogin, mockLogout }
