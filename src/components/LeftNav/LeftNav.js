import React from 'react';
import './LeftNav.css'

import Avatar from "../Common/Avatar/Avatar";
const defaultAvatar = "";

class LeftNav extends React.Component {
  render() {
    const avatar = this.props.avatar ? this.props.avatar : defaultAvatar;
    const navItems = this.props.navList.map((item, idx) => {
      return (
        <div
          className="Icon Flex AllCenter"
          title={ item.content }
          key={ idx }
          onClick={ this.props.onClick.bind(this, item.path) }
        >
          <img src={ item.icon } alt="this is an icon"/>
        </div>
      )
    })
    const expandItems = this.props.expandList.map((item, idx) => {
      return (
        <div className="Icon Flex JustifyCenter" title={ item.content } key={ idx } onClick={ item.onClick }>
          <img src={ item.icon } alt="this is an icon"/>
        </div>
      )
    })

    return (
      <div className="Fill Flex FlexColumn AlignCenter">
        <div className="Avatar WidthFill Flex AllCenter">
          <Avatar
            size="XSmall"
            src={ avatar }
          />
        </div>
        <div className="WidthFill FlexGrow">
          { navItems }
        </div>
        <div className="Expand WidthFill Flex FlexColumnRev">
          { expandItems }
        </div>
      </div>
    )
  }
}

export default LeftNav
