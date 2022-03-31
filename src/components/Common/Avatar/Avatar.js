import React from 'react';
import './Avatar.css'

class Avatar extends React.Component {
  render() {
    let imgSize = this.props.customSize ? this.props.customSize : ( this.props.size ? this.props.size : "Default" );
    let round = this.props.round ? " Round" : "";
    let radius = this.props.radius ? " Radius" : "";
    return (
      <div className={ imgSize }>
        <img
          className={ imgSize + round + radius }
          src={ this.props.src }
          alt=""
        />
      </div>
    )
  }
}

export default Avatar
