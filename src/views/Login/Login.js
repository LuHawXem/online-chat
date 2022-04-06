import React from 'react'
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Conf from '../../config.json'
import Avatar from '../../components/Common/Avatar/Avatar';
import { login } from '../../utils/request/Interface'
import { EncryptOAEP } from "../../utils/utils";

function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';

  const handleLogin = () => {
    let formData = new FormData(document.getElementById('Input'))
    let account = formData.get("account");
    let password = formData.get("password");
    password = EncryptOAEP(password)
    login(account, password).then(res => {
      let data = {
        "token": res.token,
        "nickname": res.nickname,
        "avatar": res.avatar,
      }
      localStorage.setItem('profile', JSON.stringify(data))
      localStorage.removeItem("account")
      navigate(from, { replace: true });
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="Login Flex FlexColumn AllCenter">
      <div className="InputView">
        <div id="Title">在线聊天</div>
        <div id="Avatar">
          <Avatar src={ Conf.defaultAvatar } size="XLarge" radius/>
        </div>
        <form id="Input">
          <input name="account" placeholder="账号" minLength="10" defaultValue={ localStorage.getItem("account") || null }/>
          <input name="password" type="password" placeholder="密码" maxLength="16"/>
        </form>
      </div>
      <div className="OpBtn">
        <div className="Btn LogBtn" onClick={ handleLogin }>登 录</div>
        <Link className="Btn RegBtn" to='/Register'>注 册</Link>
      </div>
    </div>
  )
}

export default Login
