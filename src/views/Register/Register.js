import React from 'react'
import {EncryptOAEP} from "../../utils/utils";
import {register} from "../../utils/request/Interface";

class Register extends React.Component {
  register = () => {
    let formData = new FormData(document.getElementById('Input'))
    let nickname = formData.get("nickname");
    let password = formData.get("password");
    let authPassword = formData.get("authPassword")
    if(password !== authPassword) {
      alert("两次输入的密码不一致")
      return
    }
    password = EncryptOAEP(password)
    register(nickname, password).then(res => {
      if(res.account) {
        localStorage.setItem("account", res.account)
        let href = window.location.href;
        window.location.href = href.slice(0, href.lastIndexOf("/")) + "/Login"
      }
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="Login Flex FlexColumn AllCenter">
        <div className="InputView">
          <div id="Title">在线聊天</div>
          <form id="Input">
            <input name="nickname" type="text" placeholder="昵称"/>
            <input name="password" type="password" placeholder="密码" maxLength="16"/>
            <input name="authPassword" type="password" placeholder="确认密码" maxLength="16"/>
          </form>
        </div>
        <div className="OpBtn">
          <div className="Btn LogBtn" onClick={ this.register }>注 册</div>
        </div>
      </div>
    )
  }
}

export default Register
