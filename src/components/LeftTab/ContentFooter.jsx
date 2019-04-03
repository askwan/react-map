import React, { Component } from 'react'
// import { Button } from 'antd';
import PropTypes from 'prop-types'

export default class ContentFooter extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="content-footer flex-center">
        {/* <Button onClick={this.props.save}>提交</Button> */}
      </div>
    )
  }
}

