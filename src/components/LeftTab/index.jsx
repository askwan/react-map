import React, { Component } from 'react'

export default class LeftTab extends Component {
  // static propTypes = {
  //   map:PropTypes.instanceOf(Map),
  // }
  state = {
    layer:'l7041'
  }

  render() {
    console.log(this.state);
    return (
      <div className="">
        {this.state.layer}
      </div>
    )
  }
}
