import Vue from "vue";
import "minireset.css";
import "normalize.css";
import "./index.scss";
import { fetch, rap } from "modules/js/fetch.js";
let url = {
  list: "/merchandiseHot/list.do",
  slideList: "/slide/listSlides.do"
};

url = rap(url);

import Slide from "components/slide/slide.vue";
import Top from "components/top/top.vue";
import Foot from "components/foot/foot.vue";
import Search from "components/search/search.vue";
new Vue({
  el: "#body",
  data: {
    tractorLists: [],
    accessoriesLists: [],
    slideLists: []
  },
  components: {
    Slide,
    Top,
    Foot,
    Search
  },
  created() {
    this.getLists();
    this.getLists(3);
    this.getSlideLists();
  },
  methods: {
    getLists(type = undefined) {
      fetch(url.list, {
        businessType: type
      }).then(res => {
        if (type) {
          this.tractorLists = res.data.merchandiseHotVOList;
        } else {
          this.accessoriesLists = res.data.merchandiseHotVOList;
        }
      });
    },
    getSlideLists() {
      fetch(url.slideList).then(res => {
        this.slideLists = res.data.slideList;
        //created钩子中调用，还没有挂载到dom树上
        // this.$nextTick(()=>{
        //   this.timer=setInterval(()=>{
        //     this.autoPlay()
        //   },3000)
        // })
      });
    },
    addNum(list) {
      list.num++;
      list.month++;
    },
    reduceNum(list) {
      if (list.num === 1 || list.month === 1) return;
      list.num--;
      list.month--;
    }
  }
});
