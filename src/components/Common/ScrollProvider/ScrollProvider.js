import React from 'react'
import './ScrollProvider.css'

class ScrollProvider extends React.Component {
  constructor(props) {
    super(props)
    if(!props.children?.props?.id) throw new Error(`the root element of ScrollProvider.children should have an id`)
    let id = props.children.props.id
    let containerId = `${id}_ScrollContainer`
    let viewId = `${id}`
    let barId = `${id}_ScrollBar`
    let thumbId = `${id}_Thumb`
    this.state = {
      containerId,
      viewId,
      barId,
      thumbId
    }
  }

  componentDidMount() {
    const { containerId, viewId, barId, thumbId } = this.state

    let container = document.getElementById(containerId)
    let view = document.getElementById(viewId)
    let bar = document.getElementById(barId)
    let thumb = document.getElementById(thumbId)
    let useScroll = false
    if(view && container && view.offsetHeight > container.offsetHeight) useScroll = true
    /* 这里不知为何bar.offsetHeight为0了,用container.offsetHeight代替 */
    thumb.style.height =  `${container.offsetHeight - (view.offsetHeight - container.offsetHeight)}px`
    this.setState({
      container,
      view,
      bar,
      thumb,
      useScroll,
      speed: 20,
    })
  }

  down = (speed) => {
    const { container, view, bar, thumb } = this.state
    view.style.position = "relative"

    let containerH = container.offsetHeight
    let viewH = view.offsetHeight || container.scrollHeight
    let barH = bar.offsetHeight
    let thumbH = thumb.offsetHeight

    if (thumb.offsetTop >= barH - thumbH) {
      view.style.top =  `${-(viewH - containerH)}px`
      thumb.style.top = `${barH - thumbH}px`
    }
    else {
      view.style.top =  `${view.offsetTop - speed}px`
      /* 滑块的顶点坐标 / 滑条的可滑动高度 = 视图的顶点坐标 / 视图的被隐藏高度 */
      thumb.style.top =  `${-(barH - thumbH) * view.offsetTop / (viewH - containerH)}px`
    }
  }

  up = (speed) => {
    const {container, view, bar, thumb} = this.state
    view.style.position = "relative"

    let containerH = container.offsetHeight
    let viewH = view.offsetHeight || container.scrollHeight
    let barH = bar.offsetHeight
    let thumbH = thumb.offsetHeight

    if (thumb.offsetTop <= 0) {
      view.style.top = '0'
      thumb.style.top = '0'
    }
    else {
      view.style.top = view.offsetTop + speed + 'px'
      thumb.style.top = -(barH - thumbH) * view.offsetTop / (viewH - containerH) + 'px'
    }
  }

  scrollRoll = (e) => {
    const { speed } = this.state
    if (e.detail > 0) {
      this.down(speed)
    }
    else if (e.detail < 0) {
      this.up(speed)
    }
    if (e.nativeEvent.wheelDelta < 0) {
      this.down(speed)
    }
    else if (e.nativeEvent.wheelDelta > 0) {
      this.up(speed)
    }
    if (e.nativeEvent.movementY > 0) {
      this.down(1)
    }
    else if (e.nativeEvent.movementY < 0) {
      this.up(1)
    }
  }

  mouseDown = () => {
    this.setState({
      mouseMove: (e) => {
        this.scrollRoll(e)
      }
    })
  }

  mouseUp = () => {
    this.setState({
      mouseMove: null
    })
  }

  render() {
    const children = this.props.children
    const { containerId, barId, thumbId } = this.state

    return (
      <div
        id={ containerId }
        className="ScrollContainer"
        onWheel={ this.state.useScroll ? this.scrollRoll : null }
        onMouseUp={ this.state.useScroll ? this.mouseUp : null }
      >
        {children}
        <div
          id={ barId }
          className="ScrollBar"
          onMouseMove={ this.state.useScroll ? this.state.mouseMove : null }
          hidden={ !this.state.useScroll }
        >
          <div
            id={ thumbId }
            className="Thumb"
            onMouseDown={ this.state.useScroll ? this.mouseDown : null }
          />
        </div>
      </div>
    )
  }
}

export default ScrollProvider
