import React from 'react'
import './Chat.css'
import SplitLine from "../../components/Common/SplitLine/SplitLine";
import SearchUnit from "../../components/SearchUnit/SearchUnit";
import ListItem from "../../components/ListItem/ListItem";
import Avatar from "../../components/Common/Avatar/Avatar";

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onSelect: 0,
      info: {
        title: "昵称: 0",
        data: []
      }
    }
  }

  handleClick = (onSelect, info) => {
    this.setState({
      onSelect,
      info,
    })
  }

  render() {
    const chatList = [];
    for(let i = 0; i < 5; i++) {
      chatList.push(
        <ListItem
          isSelect={ i === this.state.onSelect }
          left={
            <Avatar
              customSize="ChatAvatarSize"
              src="https://cloudflare.luhawxem.com/img/Avatar.jpg"
            />
          }
          mid={
            <div className="Flex FlexColumn">
              <div className="NickName">昵称:{ i }</div>
              <div className="Describe">描述:{ i }</div>
            </div>
          }
          onClick={ this.handleClick.bind(this, i, { title: `昵称:${i}`, data: []}) }
          key={ i }
        />
      )
    }

    return (
      <div className="Flex Fill">
        <div className="MidCol Flex FlexColumn">
          <SearchUnit/>
          <SplitLine/>
          <div className="FlexGrow">
            { chatList }
          </div>
        </div>
        <SplitLine column/>
        <div className="FlexGrow Flex FlexColumn">
          <div className="InfoBar">
            <div style={{ padding: "1rem 0 1rem 1.25rem", fontSize: "1.25rem" }}>
              { this.state.info.title }
            </div>
          </div>
          <SplitLine/>
          <div className="FlexGrow">

          </div>
          <SplitLine/>
          <div className="InputBar Flex">
            <textarea/>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatPage
