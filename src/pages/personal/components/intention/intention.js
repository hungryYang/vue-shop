import Pagination from "components/pagination/pagination.vue";
import { Order } from "modules/js/orderServices.js";
import { MessageBox } from "element-ui";
import { Message } from "element-ui";

export default {
  data() {
    return {
      index: 0,
      lists: "",
      pageSize: 2,
      pageNum: 1,
      total: ""
    };
  },
  created() {
    this.index = this.$route.query.index;
    this.getLists();
  },
  methods: {
    getLists() {
      Order.getIntentionLists({
        businessType: this.index,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        this.lists = res.data.list;
        this.total = res.data.total;
      });
    },
    cancel(id, index) {
      MessageBox("此操作将永久删除该意向单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Order.cancel({
            orderId: id
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
    change(page) {
      this.pageNum = page;
      this.getLists();
    }
  },
  watch: {
    $route() {
      this.index = this.$route.query.index;
      this.getLists();
    }
  },
  components: {
    Pagination
  }
};
