import React from 'react'
import './ListItem.css'

class ListItem extends React.Component {
  render() {
    const left = this.props.left
    const mid = <div className="ItemMid">{ this.props.mid }</div>
    const right = <div className="ItemRight">{ this.props.right }</div>
    return (
      <div
        className="ListItem"
        style={ this.props.isSelect ? { backgroundColor: "#c6c6c6"} : {} }
        onClick={ this.props.onClick }
      >
        { this.props.left ? left : null }
        { this.props.mid ? mid : null }
        { this.props.right ? right : null }
      </div>
    );
  }
}

export default ListItem
