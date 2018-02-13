import './minicart.scss'
import { Message } from 'element-ui'
import {Cart} from 'modules/js/cartServices'
export default {
  props: ['state'],
  data() {
    return {
      saleData: '',
      rentData: '',
      partsData: '',
      curIndex: 0
    }
  },
  created() {
    this.getLists(1)
    this.getLists(2)
    this.getLists(3)    
  },
  methods: {
    add(para) {
      Cart.list({
        month: para.month,
        number: para.number,
        type: para.type,
        unifiedMerchandiseId: para.item.unifiedMerchandiseId
      }).then(res=>{
        if(para.month){
          para.item.month++
        }else{
          para.item.number++
        }
        para.item.sum += para.item.discount
        para.data.sum += para.item.discount
      })
    },
    reduce(para) {
      if(para.month) {
        if(para.item.month <= 3) {
          para.item.month = 3
          return
        }
      } else {
        if(para.item.number <= 1) {
          para.item.number = 1
          return
        }
      }
      Cart.list({
        month: para.month,
        number: para.number,
        type: para.type,
        unifiedMerchandiseId: para.item.unifiedMerchandiseId
      }).then(res=>{
        if(para.month){
          para.item.month--
        }else{
          para.item.number--
        }
        para.item.sum -= para.item.discount
        para.data.sum -= para.item.discount
      })
    },
    getLists(type){
      Cart.list({
        pageNum:1,
        pageSize:4,
        type
      }).then(res=>{
        switch(type){
          case 1:
            this.rentData = res.data
            break;
          case 2:
            this.saleData = res.data
            break;
          case 3:
            this.partsData = res.data
            break;
        }
      })
    }
  }
}
