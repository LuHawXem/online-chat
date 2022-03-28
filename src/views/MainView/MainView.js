import React from 'react';
import ChatPage from "../Chat/Chat";
import ContactPage from "../Contact/Contact";

class MainView extends React.Component {
  render() {
    if(this.props.path === '/Chat') {
      return (
        <ChatPage/>
      )
    }
    else {
      return (
        <ContactPage/>
      )
    }
  }
}

export default MainView
