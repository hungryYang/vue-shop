import "./detail.scss";
import Vue from "vue";
import "minireset.css";
import Top from "components/top/top.vue";
import Search from "components/search/search.vue";
import Foot from "components/foot/foot.vue";
import Logstate from "components/logstate/logstate.vue";
import Minicart from "components/minicart/minicart.vue";
import { Message } from "element-ui";
import Utils from "modules/js/utils.js";

import { fetch, rap } from "modules/js/fetch.js";
import { Cart } from "modules/js/cartServices.js";
import { Order } from "modules/js/orderServices.js";
import bus from "modules/js/bus.js";
let url = {
  detail: "/product/detail.do"
};
url = rap(url);

new Vue({
  el: "#app",
  data: {
    state: parseInt(Utils.getQuery("state")),
    attrList: "",
    merchandise: "",
    id: Utils.getQuery("id"),
    number: 1,
    month: 3,
    imgs: "",
    imgIndex: 0,
    showIndex: 0,
    isCollect: false
  },
  computed: {
    countMoney() {
      let cm =
        (this.merchandise.discount || this.merchandise.price) * this.number;
      if (this.state == 1) {
        cm *= this.month;
      }
      return cm.toFixed(2);
    }
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      fetch(url.detail).then(res => {
        let data = res.data;
        this.attrList = data.attrList;
        this.merchandise = data.merchandise;
        this.imgs = this.merchandise.imageList;
        this.isCollect = this.merchandise.collect;
        this.$nextTick(() => {
          // 获取li的宽度=width+padding+margin
        });
      });
    },
    change(number) {
      if (this.imgIndex >= this.imgs.length - 4 && number > 0) {
        return;
      }
      if (this.imgIndex <= 0 && number < 0) {
        return;
      }
      this.imgIndex += number;
    },
    collect() {},
    reduceNumber() {
      if (this.number === 3) return;
      this.number--;
    },
    addNumber() {
      if (this.state == 3 && this.number == this.merchandise.stock) {
        return;
      }
      this.number++;
    },
    reduceMonth() {
      if (this.month === 1) return;
      this.month--;
    },
    addMonth() {
      this.month++;
    },
    addToCart() {
      Cart.add({
        month: this.state === 1 ? 1 : undefined,
        number: 1,
        type: this.state,
        unifiedMerchandiseId: Utils.getQuery("unifiedMerchandiseId")
      }).then(res => {
        Message({
          message: res.message,
          type: "success"
        });
        // bus.$emit('add',item.unifiedMerchandiseId)
        bus.$emit("addToCart", "520000198603154526");
      });
    },
    apply() {
      let product = {
        month: this.month,
        number: this.number,
        unifiedMerchandiseId: this.id
      };
      Order.toOrder([product], this.state);
    }
  },
  components: {
    Top,
    Foot,
    Search,
    Logstate,
    Minicart
  }
});
