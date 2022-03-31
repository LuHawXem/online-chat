import $ajax from "./Request";

function realLogin(username, password) {
  return $ajax.POST({
    url: '/login',
    data: {
      username,
      password,
    }
  })
}

function realLogout(sessionId) {
  return $ajax.POST({
    url: '/logout',
    data: {
      "session_id": sessionId
    }
  })
}

export { realLogin, realLogout }
