import Vue from 'vue'
import './submitOrder.scss'
import 'minireset.css'
import Top from 'components/top/top.vue'
import Foot from 'components/foot/foot.vue'
import Search from 'components/search/search.vue'
import utils from 'modules/js/utils.js'
import { Message } from 'element-ui'
import {Address} from 'modules/js/addressServices.js'
import {Order} from 'modules/js/orderServices.js'

let preData = JSON.parse(sessionStorage.getItem('preData'))

new Vue({
    el: '#app',
    data: {
      type: utils.getQuery("type"),
      typestr: '',
      state: '',
      add: '',
      preData: '',
      lists: '',
      mode: '',
      head: '',
      content: ''
    },
    created() {
      this.addLists()
      this.preLists()
      this.init()
    },
    methods: {
      addLists() {
        Address.list().then( res => {
          this.add = res.data.list[0]
        })
      },
      preLists() {
        Order.preorder(preData).then( res => {
          this.preData = res.data
          this.lists = this.preData.list
        })
      },
      init() {
        switch (this.type) {
          case '1':
            this.typestr = "申请租赁"
            this.state = "填写意向单"
            break;
          case '2':
            this.typestr = "申请购买"
            this.state = "填写意向单"
            break;
          case '3':
            this.typestr = "购买配件"
            this.state = "填写订单"
            break;
        }
      },
      submit() {
        // 非空校验
        let commitData = Object.assign({},preData,{
          cosigneeId: this.add.id,
          mode: this.mode,
          head: this.head,
          content: this.content,
          type: this.type
        })
        Order.commit(commitData).then( res => {
          Message({
            message:res.message,
            type:'success'
          })
          // 跳转到订单列表页
          if(this.type == 1){
            location.href = 'personal.html#/intention?index=0'
          }
          if(this.type == 2){
            location.href = 'personal.html#/intention?index=1'
          }
          if(this.type == 3){
            location.href = 'personal.html#/order?index=1'
          }
        })
      }
    },
    components: {
      Top,
      Foot,
      Search
    }
  }

)
