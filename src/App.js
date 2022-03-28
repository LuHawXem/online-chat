import React from 'react';
import './App.css';
import ChatIcon from './assets/Chat.svg'
import ContactIcon from './assets/Contact.svg'
import FileIcon from './assets/File.svg'
import MoreIcon from './assets/More.svg'
import LeftNav from "./components/LeftNav/LeftNav";
import MainView from "./views/MainView/MainView";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '/Chat'
    }
  }

  handleClick = (path) => {
    console.log(path)
    this.setState({
      path
    })
  }

  render() {
    return (
      <div className="App Flex">
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
                {icon: MoreIcon, content: "更多"}
              ]
            }
            onClick={ this.handleClick }
          />
        </nav>
        <main className="Flex FlexGrow">
          <MainView
            path={ this.state.path }
          />
        </main>
      </div>
    );
  }
}

export default App;
