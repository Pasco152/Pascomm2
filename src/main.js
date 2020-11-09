import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入ele UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import router from './router'  // 路由实例对象

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
