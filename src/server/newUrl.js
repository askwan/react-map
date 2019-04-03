import {ucServer} from '@/config.js'

// const user ={
//     getUserInfo(){  // 获取用户基本信息
//         return fetch('get',`${serverUrl}/user/interestedUsers`)
//     },
// }
export const userCenter = {
    logout() { //退出
      let token = sessionStorage.getItem('token');
      sessionStorage.removeItem('token');
      if (!token) {
        return new Promise((resove, reject) => {
          resove({
            status: 200
          })
        })
      }
      return fetch('get', `${ucServer}/account/logout?token=${token}`);
    },
    getUnreadCount() {
      return fetch('get', `${ucServer}/notice/getUnreadCount`);
    },
    getUserRoleInfo() {
      let token = sessionStorage.getItem('token');
        return fetch('get', `${ucServer}/account/authorize?token=${token}`);
    }, 
  }

// export default user;