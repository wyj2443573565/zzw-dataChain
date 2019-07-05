// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
Vue.config.productionTip = false;
// import axios from '../src/api/axios'
import axios from 'axios'
import Vuex from 'vuex'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import {API_URLS} from '../src/api/api'
// import {_store} from './store/index'
Vue.use(Element)
Vue.use(VueAxios,axios)
// Vue.use(axios)

axios.defaults.timeout=10000;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data; charset=utf-8';
axios.interceptors.request.use(config => {
  config.withCredentials = true;
return config;

},error=>{
  Element.message.error({
    message:error
  });
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  let result= response.data;
  if(result.errno==='200'){
    return Promise.resolve(result);
  }else{
    if(result.errno==='4302'){
      Element.Message.error('登陆超时，请重新登陆!')
    }
    if(result.errno==='4003'&&result.errmsg==='未购买，请联系客服'){
      Element.Message({
        type:'warning',
        message:'当前手机号用户未购买产业链数据，请联系客服:座机-010-62980199/王先生-18810587375',
        duration:0,
        showClose:true
      })
    }else{
      if(result.errno==='4006'){
        Element.Message.error(result.errmsg);
      }
    }
    return Promise.reject(result);
  }

}, err => {
  Element.Message.error({
    message:err
  });
});

Vue.prototype.store={
  state:{
    isLogin:false
  },
  login(){
    localStorage.setItem('login',true);
    this.state.isLogin=true;
  },
  logout(){
    localStorage.removeItem('login');
    this.state.isLogin=false
  },
  getIsLogin(){
    if(localStorage.getItem('login')){
      this.login();
    }
  }
}
Vue.prototype.store.getIsLogin();
Vue.prototype.apis=API_URLS;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
