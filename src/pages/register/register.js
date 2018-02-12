import 'minireset.css'
import 'normalize.css'
import './register.scss'
import {checkphone} from 'modules/js/validate'
import {rap,fetch} from 'modules/js/fetch'
import {Message} from 'element-ui'
import Vue from 'vue'

import Top from 'components/top/top.vue'
import Foot from 'components/foot/foot.vue'
let url = {
  register:'/user/register.do',
  getCode:'/user/getCode.do'
}
url = rap(url)

let second = 10
new Vue({
  el:'.register',
  components:{
    Foot
  },
  data:{
    phoneNumber:'',
    verificationCode:'',
    password:'',
    confirmpwd:'',
    phoneMsg:'',
    pwdMsg:'',
    confirmMsg:'',
    validateMsg:'',
    timer:null,
    seconds:second,
    isSuccess:false
  },
  methods:{
    getCode(){
      if(!this.timer){
        if(this.validatePhone()){
          fetch(url.getCode,{
            mobile:this.phoneNumber
          }).then((res)=>{
            Message({
              message:res.message,
              type:'success',
            })
          },(res)=>{
            Message({
              message:res.message,
              type:'error',
            })
          })
    
          this.timer = setInterval(this.countDown,1000)
        }
      }

    },
    validatePhone(){
      if(!this.phoneNumber){
        this.phoneMsg = "请输入手机号"
        return false
      }
      if(!checkphone(this.phoneNumber)){
        this.phoneMsg = "请输入正确的号码格式"
        return false
      }
      this.phoneMsg = ""
      return true
    },
    validatePwd(){
      if(!this.password){
        this.pwdMsg = "请输入密码"
        return false
      }
      if(this.password.length<8){
        this.pwdMsg = "密码长度过短，请重新设置"
        return false
      }
      this.pwdMsg = ''
      return true      
    },
    countDown(){
      this.seconds--
      if(!this.seconds){
        clearInterval(this.timer)
        this.seconds = second
        this.timer = null
      }
    },
    register(){
      if(this.validatePwd()&&this.validatePhone()&&this.confirmPassword()){
         fetch(url.register).then((res)=>{
          this.isSuccess = true
        },(res)=>{

        })
      }else{
        Message({
          message:'请输入正确信息',
          type:'error'
        })
      }
    },
    goto(){
      location.href='/login.html'
    },
    confirmPassword(){
      if(this.password !== this.confirmpwd){
        this.confirmMsg = '密码不一致，请重新输入'
        return false
      }
      this.confirmMsg = ''
      return true
    }
  }
})

new Vue({
  el:'#footer',
  components:{Foot}
})
new Vue({
  el:'#header',
  components:{Top}
})