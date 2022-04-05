import React from "react";
import "./MainView.css"
import Conf from "../../config.json"
import ChatPage from "../Chat/Chat";
import ContactPage from "../Contact/Contact";
import LeftNav from "../../components/LeftNav/LeftNav";
import ChatIcon from "../../assets/Chat.svg";
import ContactIcon from "../../assets/Contact.svg";
import FileIcon from "../../assets/File.svg";
import MoreIcon from "../../assets/More.svg";
import { logout } from "../../utils/request/Interface";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "/Chat"
    }
  }

  componentDidMount = () => {
    let data = localStorage.getItem("profile")
    data = JSON.parse(data)
    let ws = new WebSocket(Conf.websocketURL + "/ws?token=" + data.token)
    ws.onopen = function (e) {
      console.log(e)
    }
    ws.onmessage = function (e) {
      console.log(e)
    }
    // $ajax.GET({
    //   url: '/ws',
    //   headers: {
    //     "token": data.token
    //   }
    // }).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
  }

  handleClick = (path) => {
    this.setState({
      path
    })
  }

  customClick = () => {
    let data = localStorage.getItem("profile")
    data = JSON.parse(data)
    logout(data.token).then(res => {
      localStorage.removeItem("profile")
      setTimeout(() => {
        alert("登出用户成功")
        let href = window.location.href;
        window.location.href = href.slice(0, href.lastIndexOf("/")) + "/Login"
      }, 1000)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const main = this.state.path === "/Chat" ? <ChatPage/> : <ContactPage/>

    return (
      <div className="Main Flex">
        <nav className="LeftCol">
          <LeftNav
            avatar={ Conf.defaultAvatar }
            navList={
              [
                {icon: ChatIcon, content: "聊天", path: "/Chat"},
                {icon: ContactIcon, content: "通讯录", path: "/Contact"},
                {icon: FileIcon, content: "聊天文件", path: "/File"},
              ]
            }
            expandList={
              [
                {icon: MoreIcon, content: "更多", onClick: this.customClick }
              ]
            }
            onClick={ this.handleClick }
          />
        </nav>
        <main className="Flex FlexGrow">
          { main }
        </main>
      </div>
    )
  }
}

export default MainView
