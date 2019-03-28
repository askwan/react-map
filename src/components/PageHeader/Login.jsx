import React, { Component } from 'react'
import { Avatar } from 'antd';

export class Login extends Component {
  feedBack(){
    console.log('feedBack')
  }
  getHelp(){
    console.log('help')
  }
  login(){
    console.log(this,'login')
  }
  render() {
    return (
      <div className="page-login flex-between pd-left-small pd-right-small font-white font-16">
        <div className="flex-center pointer" onClick={this.login.bind(this)}>
          {/* <Icon type="login" /> */}
          <Avatar icon="user" />
          <span className="mg-left-mini">登陆</span>
        </div>
        <div className="flex-center">
          <span className="pointer" onClick={this.feedBack}>反馈</span>
          <span className="mg-left-right-mini">|</span>
          <span className="pointer" onClick={this.getHelp}>帮助</span>
        </div>
      </div>
    )
  }
}

export default Login
