import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import qs from 'qs';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


Vue.use(ElementUI);
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.qs = qs;

Vue.config.devtools = true

//设置路由title
router.beforeEach((to,from,next)=>{
  if(to.path=='/'&&store.state.token){
    router.push('/home')
  }
  if(to.path!='/'&&(!store.state.token||store.state.token=='')){
    this.$message.error('未登录，请先登录！');
    router.push('/')
  }else{
    if(to.meta.title){
      document.title = to.meta.title
    }
    next()
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
