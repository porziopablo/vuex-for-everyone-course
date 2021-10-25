import Vue from 'vue';

import { currency } from '@/currency';
import store from '@/store/index';

import App from './App';

Vue.config.productionTip = false;

Vue.filter('currency', currency);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
