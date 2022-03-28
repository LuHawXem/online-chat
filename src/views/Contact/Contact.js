import React from 'react'
import './Contact.css'
import SearchUnit from "../../components/SearchUnit/SearchUnit";
import SplitLine from "../../components/Common/SplitLine/SplitLine";
import ListItem from "../../components/ListItem/ListItem";
import Avatar from "../../components/Common/Avatar/Avatar";

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onSelect: null,
      info: {
        title: null,
        data: null
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
    const contactList = [];
    for(let i = 0; i < 5; i++) {
      contactList.push(
        <ListItem
          isSelect={ i === this.state.onSelect }
          left={
            <Avatar
              customSize="ContactAvatarSize"
              src="https://cloudflare.luhawxem.com/img/Avatar.jpg"
            />
          }
          mid={
            <div className="Fill Flex AlignCenter">
              <div className="NickName">昵称:{ i }</div>
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
            { contactList }
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
        </div>
      </div>
    )
  }
}

export default ContactPage
