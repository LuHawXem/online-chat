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
import $ajax from "../../utils/request/Request";

let messageBox = {}

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "/Chat",
      retry: false,
    }
  }

  interval = null

  componentDidMount = () => {
    if(Conf.useMock) return
    const that = this
    let data = localStorage.getItem("profile")
    data = JSON.parse(data)
    let ws = new WebSocket(Conf.websocketURL + "/ws?token=" + encodeURIComponent(data.token))
    that.interval = setInterval(() => {
      let heartbeat = {
        type: 200
      }
      ws.send(JSON.stringify(heartbeat))
    }, 50000)
    that.setState({
      ws
    })
    ws.onerror = function (e) {
      clearInterval(that.interval)
      if(that.state.retry) return
      $ajax.HEAD({
        url: "/test?token=" + encodeURIComponent(data.token)
      }).catch(err => {
        if(err.status === 401) {
          localStorage.removeItem("profile")
          setTimeout(() => {
            alert("登录信息过期,请重新登录")
            let href = window.location.href;
            window.location.href = href.slice(0, href.lastIndexOf("/")) + "/Login"
          }, 1000)
        }
        else {
          console.log(err.data)
          ws = new WebSocket(Conf.websocketURL + "/ws?token=" + encodeURIComponent(data.token))
          that.interval = setInterval(() => {
            let heartbeat = {
              type: 200
            }
            ws.send(JSON.stringify(heartbeat))
          }, 50000)
          that.setState({
            ws,
            retry: true,
          })
        }
      })
    }
    ws.onmessage = function (e) {
      let message = JSON.parse(e.data)
      if(messageBox[message.type]) messageBox[message.type].push(message)
      else messageBox[message.type] = [message]
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    this.state.ws.close()
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
    const main = this.state.path === "/Chat"
      ? <ChatPage ws={this.state.ws}/>
      : <ContactPage ws={this.state.ws} messageBox={messageBox}/>

    return (
      <div className="Main Flex">
        <nav className="LeftCol">
          <LeftNav
            avatar={ Conf.defaultAvatar }
            navList={
              [
                {icon: ChatIcon, content: "聊天(假的)", path: "/Chat"},
                {icon: ContactIcon, content: "通讯录(真实的聊天)", path: "/Contact"},
                // {icon: FileIcon, content: "聊天文件", path: "/File"},
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
