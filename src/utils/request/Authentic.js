import $ajax from "./Request";

function realRegister(nickname, password) {
  return $ajax.POST({
    url: '/register',
    data: {
      nickname,
      password
    }
  })
}

function realLogin(account, password) {
  return $ajax.POST({
    url: '/login',
    data: {
      account,
      password,
    }
  })
}

function realLogout(token) {
  return $ajax.POST({
    url: '/logout',
    headers: {
      "token": token
    }
  })
}

export { realRegister, realLogin, realLogout }
