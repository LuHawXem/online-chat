import React from 'react';
import SearchIcon from '../../assets/Search.svg'
import DeleteIcon from '../../assets/Delete.svg'
import './SearchUnit.css'

class SearchUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showClose: false,
      inputValue: ""
    }
  }

  handleFocus = (e) => {
    if(e.type === "focus") {
      this.setState({
        showClose: true
      })
    }
    if(e.type === "blur" && this.state.inputValue === "") {
      this.setState({
        showClose: false
      })
    }
  }

  handleInput= (e) => {
    this.setState({
      inputValue: e.target.value
    })
    if(this.props.getInputData) this.props.getInputData(e.target.value)
  }

  handleClean = () => {
    this.setState({
      showClose: false,
      inputValue: ""
    })
    if(this.props.getInputData) this.props.getInputData("")
  }

  render() {
    return (
      <div className="SearchUnit Flex FlexColumnRev FlexNoShrink">
        <div className="Input Fill">
          <div className="Flex FlexGrow">
            <img
              id="SearchIcon"
              src={ SearchIcon }
              alt=""
            />
            <input
              id="Search"
              className="FlexGrow BgNone"
              placeholder={ this.props.placeholder }
              onFocus={ this.handleFocus }
              onBlur={ this.handleFocus }
              onChange={ this.handleInput }
              value={ this.state.inputValue }
            />
            <img
              id="CloseIcon"
              src={ DeleteIcon }
              hidden={ !this.state.showClose }
              onClick={ this.handleClean }
              alt=""
            />
          </div>
          { this.props.slot }
        </div>
      </div>
    )
  }
}

export default SearchUnit
