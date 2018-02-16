import Vue from "vue";
import "minireset.css";
import "./productLists.scss";

require("normalize.css");

import { Message } from "element-ui";

import Top from "components/top/top.vue";
import Search from "components/search/search.vue";
import Foot from "components/foot/foot.vue";

import utils from "modules/js/utils";
import { fetch, rap } from "modules/js/fetch";

import Logstate from "components/logstate/logstate.vue";
import Minicart from "components/minicart/minicart.vue";
import Pagination from "components/pagination/pagination.vue";
import { Cart } from "modules/js/cartServices";

import bus from "modules/js/bus";

let url = {
  classify: "/lists/classify.do",
  lists: "/lists/lists.do",
  articles: "/article/articles.do"
};
url = rap(url);

new Vue({
  el: "#app",
  data: {
    classifyList: [],
    typeList: [],
    brandIndex: 0,
    typeIndex: 0,
    keyword: utils.getQuery("keyword"),
    state: parseInt(utils.getQuery("state")) || 1,
    positionMsg: "",
    macList: [],
    brandId: -1,
    typeId: -1,
    total:0,
    pageSize:8,
    pageNum:1
  },
  created() {
    if (!this.keyword) {
      this.getClassify();
    }
    this.getPositionMsg();
    this.query();
  },
  methods: {
    addToCart(item) {
      Cart.add({
        month: this.state === 1 ? 1 : undefined,
        number: 1,
        type: this.state,
        unifiedMerchandiseId: item.unifiedMerchandiseId
      }).then(res => {
        Message({
          message: res.message,
          type: "success"
        });
        // bus.$emit('add',item.unifiedMerchandiseId)
        bus.$emit("addToCart", "520000198603154526");
      });
    },
    getPositionMsg() {
      if (this.keyword) {
        this.positionMsg = "搜索";
      } else {
        console.log(1);
        switch (this.state) {
          case 1:
            this.positionMsg = "挖掘机租赁";
            break;
          case 2:
            this.positionMsg = "挖掘机销售";
            break;
          case 3:
            this.positionMsg = "配件商城";
            break;
        }
      }
    },
    getClassify() {
      fetch(url.classify).then(res => {
        this.classifyList = res.data.classifyList;
        this.typeList = this.classifyList[this.brandIndex].childrenList;
      });
    },
    selectBrand(index) {
      this.brandIndex = index;
      this.typeList = this.classifyList[this.brandIndex].childrenList;
      this.brandId = this.classifyList[index].id;
      this.query();
    },
    selectType(list, index) {
      this.typeIndex = index;
      this.typeId = list.id;
      this.query();
    },
    query(callback) {
      let reqUrl = "";
      if (this.state === 4) {
        reqUrl = url.articles;
      } else {
        reqUrl = url.lists;
      }

      fetch(reqUrl, {
        brandId: this.brandId,
        keywords: this.keyword,
        typeId: this.typeId,
        type: this.state,
        pageSize:this.pageSize,
        pageNum:this.pageNum
      }).then(res => {
        this.macList = res.data.list;
        this.total = res.data.total
        if(callback){
          callback()
        }
      });
    },
    change(page){
      this.pageNum = page
      this.query(function(){
        window.scrollTo(0,0)
      })
    }
  },
  components: {
    Top,
    Foot,
    Search,
    Logstate,
    Minicart,
    Pagination
  }
});
