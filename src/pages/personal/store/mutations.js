import * as types from "./mutations-types.js";
import { Message } from "element-ui";
const mutations = {
  [types.RECEIVE_ADDRESSES](state, { lists, total }) {
    state.lists = lists;
    state.total = total;
  },

  [types.DELETE_ADDRESS](state, { index }) {
    state.lists.splice(index, 1);
    state.total--;
  },

  [types.SET_DEFAULT](state, { address }) {
    state.lists.forEach(item => (item.acquiesce = 2));
    address.acquiesce = 1;
    Message({
      message: "默认地址设置成功",
      type: "success"
    });
  },

  [types.ADD_ADDRESS](state, { address }) {
    state.lists.push(address);
    if (address.acquiesce == 1) {
      state.lists.forEach(item => (item.acquiesce = 2));
      address.acquiesce = 1;
    }
    state.edit = false;
    state.total++;
  },

  [types.UPDATE_ADDRESSS](state, { address }) {
    if (address.acquiesce == 1) {
      state.lists.forEach(item => (item.acquiesce = 2));
      address.acquiesce = 1;
      state.edit = false;
    }
  },

  changeEdit(state, { edit }) {
    state.edit = edit;
  }
};

export default mutations;
