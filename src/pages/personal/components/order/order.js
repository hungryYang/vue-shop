import Pagination from 'components/pagination/pagination.vue'
import {Order} from 'modules/js/orderServices.js'
import {MessageBox,Message} from "element-ui"

export default {
  data() {
      return {
        index: 0,
        pageNum: 1,
        pageSize: 2,
        total: '',
        lists: ''
      }
    },
    created() {
      this.index = this.$route.query.index
      this.getLists()
    },
    methods: {
      getLists() {
        Order.getOrderLists({
          state: this.index,
          pageSize: this.pageSize,
          pageNum: this.pageNum,
        }).then(res => {
          this.lists = res.data.list
          this.total = res.data.total
        })
      },
      cancel(orderId,index) {
        MessageBox("此操作将永久删除该意向单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            Order.cancel({
              orderId
            }).then(res => {
              Message({
                type: "success",
                message: "删除成功!"
              });
              this.lists.splice(index, 1);
            });
          })
          .catch(() => {});
      },
      remove(orderId) {

      },
      sign(orderId) {

      },
      change(page) {

      }
    },
    watch: {
      '$route' () {
        this.index = this.$route.query.index
        this.getLists()
      }
    },
    components: {
      Pagination
    }
}
