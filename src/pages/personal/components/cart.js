import { Cart } from "modules/js/cartServices.js";
import Pagination from "components/pagination/pagination.vue";

export default {
  name: "cart",
  data() {
    return {
      listsData: null,
      lists: [],
      allSelected: false,
      sum: 0,
      total: 50,
      pageNum: 1,
      pageSize: 6
    };
  },
  created() {
    this.getLists();
  },
  computed: {
    selectIndex() {
      return this.$route.query.index;
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
      Cart
        .update({
          month: data.month,
          number: data.number,
          type: this.selectIndex,
          unifiedMerchandiseId: item.unifiedMerchandiseId
        })
        .then(res => {
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
    toggle(item) {},
    checkAll() {},
    toggleAll() {},
    calsum() {},
    remove() {},
    changeNum(page) {
      this.pageNum = page;
      this.getLists();
    },
    goApply() {}
  },
  components: {
    Pagination
  }
};
