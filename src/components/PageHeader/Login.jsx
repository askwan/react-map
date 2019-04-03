import React, { Component } from 'react'
import { Avatar } from 'antd';

import {ucOnegis} from '@/config'

// const uc = ucOnegis + window.location.href

export class Login extends Component {
  state = {
    isUser:sessionStorage.getItem('token')
  }

  componentDidMount(){
    console.log(Boolean(this.state.isUser),ucOnegis)
  }

  feedBack(){

  }
  getHelp(){
    this.props.toggleHelp(true);
  }
  login(){
    console.log(this,'login')
    //跳转到uc

  }
  render() {
    return (
      <div className="page-login flex-between pd-left-small pd-right-small font-white font-16">
        <a className="flex-center pointer" onClick={this.login.bind(this)} href={ucOnegis}>
          <Avatar icon="user" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
          {this.state.isUser?<span>clover<span>|</span><span>退出</span></span>:<span className="mg-left-mini">登陆</span>}
        </a>
        <div className="flex-center">
          <span className="pointer" onClick={this.feedBack.bind(this)}>反馈</span>
          <span className="mg-left-right-mini">|</span>
          <span className="pointer" onClick={this.getHelp.bind(this)}>帮助</span>
        </div>
      </div>
    )
  }
}

export default Login
