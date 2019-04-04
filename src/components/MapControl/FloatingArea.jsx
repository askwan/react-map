import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FloatingArea extends Component {
  state = {
    area: 0,
    display: "none"
  }
  static propTypes = {
    getMap: PropTypes.func.isRequired,
  }
  componentWillMount() {
    let map = this.props.getMap();
    map.on('mousemove', obj => {
      if (map.drawStatus) {
        this.setState({
          display: "block"
        })
      } else {
        this.setState({
          display: "none"
        })
      }
      let num = map.calculateArea()
      if (num) {
        this.setState({
          area: num > 1000000 ? (num / 1000000).toFixed(2) + "平方千米" : num.toFixed(2) + "平方米"
        })
      }

    })
  }

  render() {
    return (
      <div className="control-floating-area" style={{display: this.state.display }}>面积：{this.state.area}
      </div>
    )
  }
}
