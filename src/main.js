import Vue from 'vue'
import Vuelidate from 'vuelidate'

import VueAppear from './plugins/appear'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Vuelidate)
Vue.use(VueAppear)

Vue.filter ('phone', (value) => `(${value.substring(0,2)}) ${value.substring(2,6)} - ${value.substring(6,10)}`);

Vue.config.productionTip = false

new Vue ({
    router,
    store,
    render: h => h (App)
}).$mount ('#app')
