import { Cart } from "modules/js/cartServices.js";
import Pagination from "components/pagination/pagination.vue";
import { Order } from "modules/js/orderServices.js";
import {Message} from "element-ui"
export default {
  name: "cart",
  data() {
    return {
      listsData: null,
      lists: [],
      allSelected: false,
      total: 50,
      pageNum: 1,
      pageSize: 6
    };
  },
  //props: ["queryIndex"],
  created() {
    this.getLists();
  },
  computed: {
    selectIndex() {
      return this.$route.query.index;
    },
    sum() {
      let sum = 0;
      this.lists.forEach(item => {
        if (item.isSelected) {
          console.log(item.sum);
          sum += item.sum;
        }
      });
      return sum;
    }
  },
  methods: {
    goIndex() {
      location.href = "index.html";
    },
    getLists() {
      Cart.list({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: this.selectIndex
      }).then(res => {
        // 对数据增减新的属性，是先处理后赋值还是先赋值后处理
        let data = res.data;
        data.list.forEach(item => {
          item.isSelected = false;
        });
        this.listsData = data;
        this.lists = data.list;
      });
    },
    update(data) {
      let item = data.item;
      if (item.number > item.stock) {
        item.number = item.stock;
        item.sum =
          item.number *
          item.discount *
          (this.selectIndex == 1 ? item.month : 1);

        return;
      }
      if (data.month) {
        if (item.month < 3) {
          item.month = 3;
          item.sum =
            item.number *
            item.discount *
            (this.selectIndex == 1 ? item.month : 1);

          return;
        }
      } else if (item.number < 1) {
        item.number = 1;
        item.sum =
          item.number *
          item.discount *
          (this.selectIndex == 1 ? item.month : 1);

        return;
      }
      Cart.update({
        month: data.month,
        number: data.number,
        type: this.selectIndex,
        unifiedMerchandiseId: item.unifiedMerchandiseId
      }).then(res => {
        item.sum =
          item.number *
          item.discount *
          (this.selectIndex == 1 ? item.month : 1);
      });
    },
    add(data) {
      let item = data.item;
      if (item.number >= item.stock) {
        return;
      }
      Cart.add({
        month: data.month,
        number: data.number,
        type: this.selectIndex,
        unifiedMerchandiseId: item.unifiedMerchandiseId
      }).then(res => {
        if (data.month) {
          item.month++;
        } else {
          item.number++;
        }
        item.sum =
          item.number *
          item.discount *
          (this.selectIndex == 1 ? item.month : 1);
      });
    },

    reduce(data) {
      let item = data.item;
      if (data.month) {
        if (item.month <= 3) {
          return;
        }
      } else if (item.number <= 1) {
        return;
      }
      Cart.reduce({
        month: data.month,
        number: data.number,
        type: this.selectIndex,
        unifiedMerchandiseId: item.unifiedMerchandiseId
      }).then(res => {
        if (data.month) {
          item.month--;
        } else {
          item.number--;
        }
        item.sum =
          item.number *
          item.discount *
          (this.selectIndex == 1 ? item.month : 1);
      });
    },
    toggle(item) {
      if (item.isSelected) {
        this.allSelected = this.checkAll();
      } else {
        this.allSelected = false;
      }
    },
    checkAll() {
      return this.lists.every(item => {
        return item.isSelected;
      });
    },
    toggleAll() {
      this.lists.forEach(item => {
        item.isSelected = !this.allSelected;
      });
    },
    calsum() {},
    remove() {
      let ids = [];
      this.lists.forEach(item => {
        if (item.isSelected) {
          ids.push(item.unifiedMerchandiseId);
        }
      });
      Cart.remove({
        longList: ids.toString(),
        type: this.selectIndex
      }).then(res => {
        this.lists = this.lists.filter(item => {
          return !item.isSelected;
        });
      });
    },
    changeNum(page) {
      this.pageNum = page;
      this.getLists();
    },
    goApply() {
      let lists = this.lists.filter(item => {
        return item.isSelected;
      });
      if (!lists.length) {
        Message({
          message: "请选择商品",
          type: "warning"
        });
        return;
      }
      Order.toOrder(lists, this.selectIndex);
    }
  },
  // watch: {
  //   queryIndex() {
  //     this.getLists();
  //   }
  // },
  components: {
    Pagination
  }
};
