import {rap,fetch} from 'modules/js/fetch.js'

let url = {
  login: '/user/login.do',
  info: '/user/getUser.do',
  logout: '/user/logout.do'
}
url = rap(url)

class User{
  static getInfo(){
     return fetch(url.info)
  }
  static login(data){
     return fetch(url.login,data)
  }

  static logout(){
     return fetch(url.logout)
  }
}


export  {User}
