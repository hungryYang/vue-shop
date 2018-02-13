import './top.scss'
import {fetch,rap} from 'modules/js/fetch.js'
import bus from 'modules/js/bus'
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
    bus.$on('login',(userInfo)=>{
      this.isLogin = true
      this.mobile = userInfo.mobile
    })
  },
  methods:{
    logout(){
      fetch(url.logout).then(res=>{
        this.isLogin = false
        this.mobile = ''
        bus.$emit('logout')
      })
    },
    getInfo(){
      fetch(url.info).then(res=>{
        this.mobile = res.data.user.mobile
        this.isLogin = true
        bus.$emit('getInfo',res.data.user)
      })
    }
  }
}