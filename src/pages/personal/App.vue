<template>
  <div class="main-content-w clearfix">
      <!--left-->
      <section id="leftNav">
        <!--登录信息-->
        <div class="left-fault-query" v-if="user">
          <img :src="user.headImage" alt="头像">
          <p>{{user.nickname}}</p>
          <p>{{user.mobile}}</p>
        </div>
        <div class="left-fault-query" v-else="user">
          <img src="./imgs/face-img2.jpg" alt="头像">
        </div>
        <!--导航-->
        <ul class="left-nav">
            <li  v-for="(tab,index) in tabs" :key="index" @click="changeTab(index)">
              <a href="javascript:;"><i :class="'icon-'+tab.tabClass"></i>{{tab.tabName}}</a>
                <ul class="left-subnav" v-show="index === tabIndex">
                  <li @click.stop="changeSelect(index)" v-for="(list,index) in tab.lists" :class="{'select':index===selectIndex}"><a href="javascript:;">{{list}}<i class="icon-fanye"></i></a></li>
                </ul>
            </li>
        </ul>
      </section>
      <!--right-->
      <div class="mt13 right-content">
        <!-- 路由切换 -->
       <router-view></router-view>
      </div>
    </div>
</template>

<script>
import bus from "modules/js/bus.js";
import tab from "./tabConfig.js";
import Utils from "modules/js/utils.js";
export default {
  data() {
    return {
      user: null,
      tabs: tab,
      selectIndex: 0,
      tabIndex: 0
    };
  },
  created() {
    bus.$on("getInfo", user => {
      this.user = user;
    });
    bus.$on("login", user => {
      this.user = user;
    });

    let pathData = location.href.split("#/")[1];
    if (pathData) {
      if (pathData.indexOf("?") > -1) {
        let path = pathData.split("?");
        this.tabIndex = this.tabs.findIndex(item => {
          return item.path == path[0];
        });
        this.selectIndex = parseInt(path[1].split("=")[1]);
      } else {
        let path = pathData.split("/");
        this.tabIndex = this.tabs.findIndex(item => {
          return item.path == path[0];
        });
        this.selectIndex = this.tabs[this.tabIndex].children.findIndex(item => {
          return item.path == path[1];
        });
      }
    }
    this.delRouter(this.selectIndex);
  },
  methods: {
    changeTab(index) {
      this.tabIndex = index;
      this.selectIndex = -1;
    },
    changeSelect(index) {
      this.selectIndex = index;
      this.delRouter(index);
    },
    delRouter(index) {
      let tab = this.tabs[this.tabIndex];
      if (tab.children) {
        this.$router.push({
          path: `/${tab.path}/${tab.children[index].path}`
        });
      } else {
        this.$router.push({
          path: "/" + this.tabs[this.tabIndex].path,
          query: { index: index }
        });
      }
    }
  }
};
</script>
