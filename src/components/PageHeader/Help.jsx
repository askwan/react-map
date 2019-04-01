import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Drawer } from 'antd';

export default class Help extends Component {
  static propTypes = {
    toggleHelp: PropTypes.func.isRequired,
    showHelp:PropTypes.bool.isRequired,
  }
  static defaultProps = {
    name:'askwan'
  }
  onClose(){
    console.log(this.props,'props.close');
    this.props.toggleHelp(false);
  }
  render() {
    let width = window.innerWidth;
    return (
      <Drawer 
        title="help"
        placement="right"
        width={width}
        onClose = {this.onClose.bind(this)}
        visible = {this.props.showHelp}
        className="help-drawer"
      >
        <h2>help</h2>
      </Drawer>
    )
  }
}
