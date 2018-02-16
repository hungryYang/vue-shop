import "./logstate.scss";
import { Message } from "element-ui";
import { checkphone } from "modules/js/validate";
import { User } from "modules/js/userServices";
import bus from "modules/js/bus";

export default {
  data() {
    return {
      name: "",
      username: "13161967402",
      headImage: "",
      isLogin: false,
      pwd: "123456789"
    };
  },
  created() {
    bus.$on("logout", () => {
      this.isLogin = false;
      this.name = "";
      this.username = "";
      this.headImage = "";
      this.pwd = "";
    });
    bus.$on("getInfo", userInfo => {
      this.isLogin = true;
      this.name = userInfo.name;
      this.username = userInfo.username;
      this.headImage = userInfo.headImage;
    });
  },
  methods: {
    getUserInfo() {
      User.getInfo().then(res => {
        let userInfo = res.data.user;
        this.isLogin = true;
        this.name = userInfo.name;
        this.username = userInfo.mobile;
        this.headImage = userInfo.headImage;
        bus.$emit("login", userInfo);
      });
    },
    login() {
      if (!this.username) {
        Message("请输入手机号");
        return;
      }
      if (!checkphone(this.username)) {
        Message("请输入正确的手机号");
        return;
      }
      if (!this.pwd) {
        Message("请输入密码");
        return;
      }
      User.login({
        username: this.username,
        pwd: this.pwd
      }).then(res => {
        this.getUserInfo();
      });
    }
  }
};
