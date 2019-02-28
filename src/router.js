import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'transfers/new',
          name: 'new-transfer',
          component: () => import(/* webpackChunkName: "new-transfer" */ './views/TransfersNew.vue'),
        },
        {
          path: 'transfers/:id',
          name: 'transfer-details',
          component: () => import(/* webpackChunkName: "transfer-details" */ './views/TransfersSingle.vue'),
        },
        {
          path: 'suppliers',
          name: 'all-suppliers',
          component: () => import(/* webpackChunkName: "all-suppliers" */ './views/SuppliersAll.vue'),
        },
        {
          path: 'suppliers/new',
          name: 'new-supplier',
          component: () => import(/* webpackChunkName: "new-supplier" */ './views/SuppliersNew.vue'),
        },
        {
          path: 'suppliers/:id',
          name: 'supplier-details',
          component: () => import(/* webpackChunkName: "new-supplier" */ './views/SuppliersSingle.vue'),
        },
      ],
    },
  ],
});
