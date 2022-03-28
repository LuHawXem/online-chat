import React from 'react'
import './SplitLine.css'

class SplitLine extends React.Component {
  render() {
    return (
      <div id={ this.props.column ? "SplitLineColumn": "SplitLineRow" }/>
    )
  }
}

export default SplitLine
