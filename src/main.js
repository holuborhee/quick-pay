import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import Api from './Api';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

async function getAllBanks() {
  const response = await Api.fetch('GET', '/banks');
  if (response.isSuccessful) Vue.prototype.$banks = response.data;
}

getAllBanks();
