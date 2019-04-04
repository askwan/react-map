import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FloatingArea extends Component {
  state = {
    area: 0,
    top: 0,
    left: 0,
    display: "none"
  }
  static propTypes = {
    getMap: PropTypes.func.isRequired,
  }
  componentWillMount() {
    let map = this.props.getMap();
    map.on('mousemove', obj => {
      this.setState({
        top: window.event.clientY,
        left: window.event.clientX+10,
      })
      if (map.drawStatus) {
        this.setState({
          display: "block"
        })
      } else {
        this.setState({
          display: "none"
        })
      }
      let num=map.calculateArea()
      this.setState({
        area: num>1000000?num/1000000+"平方千米":num+"平方米"
      })
    })
  }
             
  render() {
    return (
      <div className="control-floating-area" style={{top:this.state.top+"px",left:this.state.left+"px",display:this.state.display}}>面积：{this.state.area}
      </div>
    )
  }
}
