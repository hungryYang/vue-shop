import './top.scss'
import {fetch,rap} from 'modules/js/fetch.js'
let url = {
  info: '/user/getUser.do',
  logout: '/user/logout.do'
}
url = rap(url)
export default{
  name:'top',
  data(){
    return {
      mobile:'',
      isLogin:false
    }
  },
  created(){
    this.getInfo()
  },
  methods:{
    logout(){
      fetch(url.logout).then(res=>{
        this.isLogin = false
        this.mobile = ''
      })
    },
    getInfo(){
      fetch(url.info).then(res=>{
        this.mobile = res.data.user.mobile
        this.isLogin = true
      })
    }
  }
}