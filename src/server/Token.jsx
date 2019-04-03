import React from 'react'
import {userCenter} from './newUrl'

export default class Home extends React.Component{
    componentDidMount(){
        let url =  window.location.href.split('/token')[0];
        let token = this.props.location.query;
        if(token){
            sessionStorage.setItem("token", token);
            this.loadUser()
        }else{
            window.location.href = ucOnegis+url;  //跳转到登录
        }
    }

    loadUser(){
        userCenter.getUserRoleInfo().then(res=>{
            console.log(res)
            if(res.status == 450){
                sessionStorage.removeItem("token");
                window.location.href = ucOnegis + window.location.href
                return;
            }else if(res.status == 200){
                if (res.data.active == 1) {
                    userCenter.logout().then(res => {
                      window.OneGis.$message.error("此账号已被禁用!");
                    //   space.setInfo("roles", {});
                      sessionStorage.removeItem("token");
                      window.location.href = ucOnegis + window.location.href;
                    });
                  }

                  this.props.history.push('/')
            }
        })
    }

    render(){
        return(
            <div></div>
        )
    }
} 