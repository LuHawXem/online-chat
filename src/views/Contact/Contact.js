import React from 'react'
import './Contact.css'
import SearchUnit from "../../components/SearchUnit/SearchUnit";
import SplitLine from "../../components/Common/SplitLine/SplitLine";
import ListItem from "../../components/ListItem/ListItem";
import Avatar from "../../components/Common/Avatar/Avatar";
import ScrollProvider from "../../components/Common/ScrollProvider/ScrollProvider";

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onSelect: null,
      info: {
        title: null,
        data: null
      },
      addMode: false,
    }
  }

  handleClick = (onSelect, info) => {
    this.setState({
      onSelect,
      info,
    })
  }

  getSearchValue = (value) => {
    this.setState({
      inputValue: value
    })
  }

  searchUser = () => {
    if(this.state.inputValue.length === 10) {
      let message = {
        receiver: 0,
        content: this.state.inputValue,
        type: 4
      }
      this.props.ws.onmessage = (e) => {
        console.log(JSON.parse(e.data))
      }
      this.props.ws.send(JSON.stringify(message))
    }
  }

  render() {
    const contactList = [];
    if(!this.state.addMode) {
      for (let i = 0; i < 5; i++) {
        contactList.push(
          <ListItem
            isSelect={i === this.state.onSelect}
            left={
              <Avatar
                customSize="ContactAvatarSize"
                src="https://cloudflare.luhawxem.com/img/Avatar.jpg"
              />
            }
            mid={
              <div className="Fill Flex AlignCenter">
                <div className="NickName">昵称:{i}</div>
              </div>
            }
            onClick={this.handleClick.bind(this, i, {title: `昵称:${i}`, data: []})}
            key={i}
          />
        )
      }
    }
    else {
      contactList.push(
        <ListItem
          left={
            <Avatar
              customSize="ContactAvatarSize"
              src="https://cloudflare.luhawxem.com/img/Avatar.jpg"
            />
          }
          mid={
            <div className="Fill Flex AlignCenter" style={{ width: "10rem" }}>
              <div className="SearchItem">搜索用户:{this.state.inputValue}</div>
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
          <div className="FlexGrow">

          </div>
        </div>
      </div>
    )
  }
}

export default ContactPage
