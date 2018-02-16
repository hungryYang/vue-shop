import "minireset.css";
import "normalize.css";
import "./login.scss";

import Vue from "vue";
import { checkphone } from "modules/js/validate";
import { rap, fetch } from "modules/js/fetch.js";

import Top from "components/top/top.vue";
import Foot from "components/foot/foot.vue";
let url = {
  login: "/user/login.do"
};
url = rap(url);

new Vue({
  el: "#loginBoxMsg",
  data: {
    phoneNumber: "",
    password: "",
    phoneMsg: "",
    pwdMsg: ""
  },
  components: { Top, Foot },
  methods: {
    validatePhone() {
      if (!this.phoneNumber) {
        this.phoneMsg = "请输入手机号";
        return false;
      }
      if (!checkphone(this.phoneNumber)) {
        this.phoneMsg = "请输入正确的号码格式";
        return false;
      }
      this.phoneMsg = "";
      return true;
    },
    validatePwd() {
      if (!this.password) {
        this.pwdMsg = "请输入密码";
        return false;
      }
      if (this.password.length < 8) {
        this.pwdMsg = "密码长度过短，请重新设置";
        return false;
      }
      this.pwdMsg = "";
      return true;
    },
    login() {
      if (this.validatePhone() && this.validatePwd()) {
        fetch(url.login).then(
          res => {
            location.href = "/index.html";
          },
          res => {
            console.log(res);
          }
        );
      }
    }
  }
});

new Vue({
  el: "#footer",
  components: { Foot }
});

new Vue({
  el: "#header",
  components: { Top }
});
