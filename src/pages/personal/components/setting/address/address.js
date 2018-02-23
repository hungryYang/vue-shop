import Pagination from "components/pagination/pagination.vue";
import { Address } from "modules/js/addressServices.js";
import EditAddress from "./editAddress/editAddress.vue";
import { Message } from "element-ui";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      add: null, //修改新增要传递的地址实例
      pageSize: 10,
      pageNum: 1
    };
  },
  created() {
    this.getLists();
  },
  computed: mapState(["lists", "total", "edit"]),
  methods: {
    ...mapActions(["getLists", "deleteAddress", "setDefault"]),
    ...mapMutations(["changeEdit"]),
    editAddress(add) {
      this.add = add;
      this.changeEdit({ edit: true });
    }
  },
  components: {
    Pagination,
    EditAddress
  }
};
