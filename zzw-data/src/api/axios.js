import axios from 'axios'
const instance = axios.create();
instance.defaults.timeout=10000;
instance.defaults.headers.post['Content-Type'] = 'multipart/form-data; charset=utf-8';
instance.interceptors.request.use(config => {
  // config.withCredentials = true;
  return config;
},error=>{
  this.$message.error({
    $message:error
  });
  return Promise.reject(error)
});

instance.interceptors.response.use(response => {
  return response.data
}, err => {
  this.$message.error({
    message:error
  });
});

function plugin(Vue) {
  if (plugin.installed) {
    return;
  }
  Vue.http = instance;
}

if (typeof  window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
export default plugin;
