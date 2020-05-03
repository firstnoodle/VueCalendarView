import Vue from 'vue';
import App from './App.vue';

window.moment = require('moment');

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount('#app');
