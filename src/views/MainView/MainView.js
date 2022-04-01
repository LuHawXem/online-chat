import React from 'react';
import './MainView.css'
import ChatPage from "../Chat/Chat";
import ContactPage from "../Contact/Contact";
import LeftNav from "../../components/LeftNav/LeftNav";
import ChatIcon from "../../assets/Chat.svg";
import ContactIcon from "../../assets/Contact.svg";
import FileIcon from "../../assets/File.svg";
import MoreIcon from "../../assets/More.svg";
import { logout } from "../../utils/request/Interface";

import { useLocation, useNavigate } from "react-router-dom";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '/Chat'
    }
  }

  handleClick = (path) => {
    this.setState({
      path
    })
  }

  customClick = () => {
    logout(localStorage.getItem('session_id')).then(res => {
      console.log(res)
      localStorage.removeItem('session_id')
      let href = window.location.href;
      window.location.href = href.slice(0, href.lastIndexOf('/')) + '/Login'
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const main = this.state.path === '/Chat' ? <ChatPage/> : <ContactPage/>

    return (
      <div className="Main Flex">
        <nav className="LeftCol">
          <LeftNav
            avatar="https://cloudflare.luhawxem.com/img/Avatar.jpg"
            navList={
              [
                {icon: ChatIcon, content: "聊天", path: '/Chat'},
                {icon: ContactIcon, content: "通讯录", path: '/Contact'},
                {icon: FileIcon, content: "聊天文件", path: '/File'},
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
