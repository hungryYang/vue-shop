import * as types from "./mutations-types.js";
import { Address } from "modules/js/addressServices.js";

const actions = {
  getLists({ commit }) {
    Address.list().then(res => {
      commit(types.RECEIVE_ADDRESSES, {
        lists: res.data.list,
        total: res.data.total
      });
    });
  },

  deleteAddress({ commit }, { id, index }) {
    Address.delete({
      consigneeId: id
    }).then(res => {
      commit(types.DELETE_ADDRESS, { index });
    });
  },

  setDefault({ commit }, { address }) {
    Address.setDefault({
      consigneeId: address.id
    }).then(res => {
      commit(types.SET_DEFAULT, { address });
    });
  },

  addAddress({ commit }, { address }) {
    Address.add(address).then(res => {
      commit(types.ADD_ADDRESS, { address });
    });
  },

  updateAddress({ commit }, { address }) {
    Address.update(address).then(res => {
      commit(types.UPDATE_ADDRESSS, { address });
    });
  }
};

export default actions;
