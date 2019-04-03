import React, { Component } from 'react'
import { Icon } from 'antd';

export default class MaskLayer extends Component {
  render() {
    return (
      <div className="mask-layer">
        <div className="font-20 mg-bottom-small">Loading...</div>
        <Icon type="loading" className="font-30" />
      </div>
    )
  }
}
