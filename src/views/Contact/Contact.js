import React from 'react'
import './Contact.css'
import SearchUnit from "../../components/SearchUnit/SearchUnit";
import SplitLine from "../../components/Common/SplitLine/SplitLine";
import ListItem from "../../components/ListItem/ListItem";
import Avatar from "../../components/Common/Avatar/Avatar";
import ScrollProvider from "../../components/Common/ScrollProvider/ScrollProvider";
import ProfileCard from "../../components/Common/ProfileCard/ProfileCard";
import Conf from "../../config.json"

let messageBox = {}

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    let that = this;
    messageBox = {...props.messageBox}
    this.props.ws.onmessage = function (e) {
      let message = JSON.parse(e.data)
      if(messageBox[message.type]) messageBox[message.type].push(message)
      else messageBox[message.type] = [message]
      let newMessage = that.state.message;
      if(message.type == "0" && that.state.message && message["created_by"] === that.state?.info?.id) {
        newMessage.push(message)
      }
      console.log(messageBox)
      that.setState({
        friends: messageBox["5"][0].friends,
        message: newMessage
      })
    }
    this.state = {
      onSelect: null,
      info: {
        title: null,
        data: null
      },
      addMode: false,
    }
  }

  componentDidMount() {
    let message = {
      type: 5
    }
    this.props.ws.send(JSON.stringify(message))
  }

  handleClick = (onSelect, info) => {
    let message = [];
    if(info.id && messageBox["0"]) {
      for (const item of messageBox["0"]) {
        if(item["created_by"] === info.id) {
          message.push(item)
        }
      }
    }
    this.setState({
      onSelect,
      info,
      message
    })
  }

  getSearchValue = (value) => {
    if(value === "") {
      this.setState({
        inputValue: value,
        profile: null
      })
      return
    }
    this.setState({
      inputValue: value
    })
  }

  getNewFriends = () => {
    console.log(messageBox["1"])
    this.setState({
      onSelect: 0,
      info: {title: "新的朋友"},
      inviteList: messageBox["1"]
    })
  }

  searchUser = () => {
    let message = {
      receiver: 0,
      content: this.state.inputValue,
      type: 4
    }
    this.props.ws.onmessage = (e) => {
      let profile = JSON.parse(e.data)
      console.log(profile)
      this.setState({
        profile
      })
    }
    this.props.ws.send(JSON.stringify(message))
  }

  acceptInvite = (id) => {
    let message = {
      type: 0,
      reply_id: id,
      operate: 1
    }
    this.props.ws.send(JSON.stringify(message))
  }

  sendMessage = () => {
    let text = document.getElementById("textarea")
    let form = new FormData(text)
    let message = {
      receiver: this.state.info.id,
      content: form.get("input"),
      type: 0
    }
    this.props.ws.send(JSON.stringify(message))
    let newMessage = this.state.message
    newMessage.push({
      content: form.get("input")
    })
    this.setState({
      message: newMessage
    })
  }


  render() {
    const contactList = [];
    let inviteList = [];
    let messageList = [];

    if(!this.state.addMode) {
      contactList.push(
        <ListItem
          left={
            <Avatar
              customSize="ContactAvatarSize"
              src={Conf.defaultAvatar}
            />
          }
          mid={
            <div className="Fill Flex AlignCenter" style={{ width: "10rem" }}>
              <div className="SearchItem">新的朋友</div>
            </div>
          }
          right={
            <div className="Flex AlignCenter HeightFill">
              >
            </div>
          }
          onClick={this.getNewFriends}
          key={0}
        />
      )
      if(this.state.friends && this.state.friends.length > 0) {
        const { friends } = this.state
        for(let i = 0; i < friends.length; i++) {
          contactList.push(
            <ListItem
              left={
                <Avatar
                  customSize="ContactAvatarSize"
                  src={Conf.defaultAvatar}
                />
              }
              mid={
                <div className="Fill Flex AlignCenter" style={{ width: "10rem" }}>
                  <div className="SearchItem">{friends[i].user.nickname}</div>
                </div>
              }
              onClick={this.handleClick.bind(this, i + 1, {title: friends[i].user.nickname, id: friends[i].user.id})}
              key={i + 1}
            />
          )
        }
      }
    }
    else if(this.state.addMode && this.state.inputValue) {
      contactList.push(
        <ListItem
          left={
            <Avatar
              customSize="ContactAvatarSize"
              src={Conf.defaultAvatar}
            />
          }
          mid={
            <div className="Fill Flex AlignCenter" style={{ width: "10rem" }}>
              <div className="SearchItem">搜索:{this.state.inputValue}</div>
            </div>
          }
          right={
            <div className="Flex AlignCenter HeightFill">
              >
            </div>
          }
          onClick={this.searchUser}
          key={0}
        />
      )
    }

    let search = !this.state.addMode
      ? (<SearchUnit
          slot={
            <div className="AddBtn" onClick={ () => {this.setState({addMode: true})} }>+</div>
          }
          placeholder="搜索"
        />)
      : (<SearchUnit
        getInputData={this.getSearchValue}
        slot={
          <span className="Cancel" onClick={ () => {this.setState({addMode: false})} }>取消</span>
        }
        placeholder="chat号"
      />)

    if(this.state.inviteList && this.state.inviteList.length > 0) {
      inviteList = this.state.inviteList.map((v, i) => {
        return (
          <ListItem
            left={
              <Avatar
                customSize="ContactAvatarSize"
                src={Conf.defaultAvatar}
                // src={ v.avatar }
              />
            }
            mid={
              <div className="Fill Flex AlignCenter">
                <div className="NickName">{ v.nickname }</div>
                <div className="Describe">{ v.content }</div>
              </div>
            }
            right={
              <div className="Flex AlignCenter HeightFill" onClick={this.acceptInvite.bind(this, v.id)}>
                接受
              </div>
            }
            key={i}
          />
        )
      })
    }

    const { message } = this.state
    if(message) {
      console.log(message)
      messageList = message.map((v, i) => {
        return (
          <div
            style={{border: "0.125rem solid #999999", display:"inline-flex", minHeight: "2rem",
            minWidth: "4rem", borderRadius:"0.125rem",position:"absolute",
              left: v["created_by"] === this.state.info?.id ? "2rem": null,
              right: v["created_by"] === this.state.info?.id ? null: "2rem",
              top: `${(2 * i + 1) * 2}rem`
            }}
            key={i}
          >
            {v.content}
          </div>
        )
      })
    }


    return (
      <div className="Flex Fill">
        <div className="MidCol Flex FlexColumn">
          {search}
          <SplitLine/>
          <ScrollProvider>
            <div id="ContactList" className="FlexGrow">
              {contactList}
            </div>
          </ScrollProvider>
        </div>
        <SplitLine column/>
        <div className="FlexGrow Flex FlexColumn">
          <div className="InfoBar FlexNoShrink">
            <div>
              {this.state.info.title}
            </div>
          </div>
          <SplitLine/>
          {/*<div className="FlexGrow" style={{position:"relative"}}>*/}
          {/*  <ProfileCard ws={this.props.ws} profile={this.state.profile}/>*/}
          {/*  {inviteList}*/}
          {/*</div>*/}
          <ScrollProvider>
            <div id="ChatContent" className="FlexGrow">
              <ProfileCard ws={this.props.ws} profile={this.state.profile}/>
              {inviteList}
              {messageList}
            </div>
          </ScrollProvider>
          <SplitLine/>
          <div className="InputBar FlexNoShrink" style={{position:"relative",display: !this.state.onSelect ? "none":"block"}}>
            <form id="textarea" style={{display:"flex"}}>
              <textarea name="input"/>
            </form>
            <div
              className="Btn"
              style={{width: "6rem",position:"absolute",right:"1rem",bottom:"1rem",backgroundColor:"#07c3f2"}}
              onClick={this.sendMessage}
            >
              发送
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ContactPage
