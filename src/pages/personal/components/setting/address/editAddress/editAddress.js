import { Message } from "element-ui";
import { Address } from "modules/js/addressServices.js";
import { mapMutations, mapActions } from "vuex";
export default {
  props: ["add"],
  data() {
    return {
      provinceLists: "",
      cityLists: "",
      districtLists: "",
      addr: this.add
        ? this.add
        : {
            name: "",
            mobile: "",
            province: "",
            city: "",
            district: "",
            address: "",
            acquiesce: 1
          }
    };
  },
  created() {
    this.getProvince();
    if (this.add) {
      //修改地址
      this.getCity();
      this.getDistrict();
    }
  },
  methods: {
    getProvince() {
      Address.province().then(res => {
        this.provinceLists = res.data.provinceList;
      });
    },
    getCity() {
      Address.city({
        province: this.addr.province
      }).then(res => {
        this.cityLists = res.data.cityList;
      });
    },
    getDistrict() {
      Address.district({
        city: this.addr.city
      }).then(res => {
        this.districtLists = res.data.districtList;
      });
    },
    saveAddress() {
      let data = {address:this.addr}
      this.add == null ? this.addAddress(data) : this.updateAddress(data)
    },
    cancel() {
      this.changeEdit({ edit: false });
    },
    ...mapActions(["addAddress", "updateAddress"]),
    ...mapMutations(["changeEdit"])
  }
};
