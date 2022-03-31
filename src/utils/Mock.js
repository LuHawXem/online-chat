function mockLogin(username, password) {
  return new Promise((resolve, reject) => {
    if(username === "test" && password === "test") {
      resolve({
        'msg': 'mock data returned',
        'session_id': 114514
      })
    }
    else {
      reject({
        'errmsg': 'username or password is wrong'
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
        'errmsg': 'something wrong'
      })
    }
  })
}

export { mockLogin, mockLogout }
