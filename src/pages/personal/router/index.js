import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import paths from "../tabConfig.js";
let routes = [];
paths.forEach(item => {
  let path = item.path;
  if (item.children) {
    let chRoutes = [];
    item.children.forEach(item => {
      let chPath = item.path;
      chRoutes.push({
        path: chPath,
        component: resolve =>
          require([`../components/${path}/${chPath}/${chPath}.vue`], resolve)
      });
    });
    routes.push({
      path: `/${path}`,
      component: resolve =>
        require([`../components/${path}/${path}.vue`], resolve),
      children: chRoutes
    });
  } else {
    routes.push({
      path: `/${path}`,
      component: resolve =>
        require([`../components/${path}/${path}.vue`], resolve)
    });
  }
});

export default new Router({
  routes
});
