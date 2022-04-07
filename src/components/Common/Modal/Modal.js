import React from "react"
import './Modal.css'
import SplitLine from "../SplitLine/SplitLine";

class Modal extends React.Component {
  render() {
    const { show, custom, useMask, cancelFunc, confirmFunc, cancelText, confirmText, content, title } = this.props

    if(!show) return null
    if(custom)
      return (
        <div className="Mask" style={{ pointerEvents: useMask ? "all" : "none"}}>
          <div className="Modal">
            {custom}
          </div>
        </div>
      )

    return (
      <div className="Mask" style={{ pointerEvents: useMask ? "all" : "none"}}>
        <div className="Modal">
          <div id="Title">
            { title }
          </div>
          <div id="Content">
            { content }
          </div>
          <SplitLine/>
          <div id="Operate">
            <div className="Btn" onClick={ typeof cancelFunc === "function" ? cancelFunc : null }>
              { cancelText ? cancelText : "取消" }
            </div>
            <SplitLine column/>
            <div className="Btn" onClick={ typeof confirmFunc === "function" ? confirmFunc : null }>
              { confirmText ? confirmText : "确定" }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
