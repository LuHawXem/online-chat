import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Common/Avatar/Avatar';

class Login extends React.Component {
  handleLogin = () => {
    let formData = new FormData(document.getElementById('Input'))
    let username = formData.get("username");
    let password = formData.get("password");
    console.log({username, password})
  }

  render() {
    return (
      <div className="Login Flex FlexColumn AllCenter">
        <div className="InputView">
          <div id="Title">在线聊天</div>
          <div id="Avatar">
            <Avatar src="https://cloudflare.luhawxem.com/img/Avatar.jpg" size="XLarge" radius/>
          </div>
          <form id="Input">
            <input name="username" placeholder="账号"/>
            <input name="password" type="password" placeholder="密码" maxLength="16"/>
          </form>
        </div>
        <div className="OpBtn">
          <div className="Btn LogBtn" onClick={ this.handleLogin }>登 录</div>
          <Link className="Btn RegBtn" to='/Register'>注 册</Link>
        </div>
      </div>
    )
  }
}

export default Login
