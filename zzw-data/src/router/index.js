import Vue from 'vue'
import Router from 'vue-router'

const Home= ()=>import('@/components/home.vue')
const FirmData=()=>import('@/components/firmData.vue')
const Login =()=>import('@/components/login.vue')
const Personal=()=>import('@/components/personal.vue')
const intention=()=>import('@/components/intention.vue')
const chainImg=()=>import('@/components/chainImg.vue')
Vue.use(Router);

const router= new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/firmData',
      name:'firmData',
      meta:{
        requiredAuth:true
      },
      component:FirmData
    },
    {
      path:'/login',
      name:'login',
      meta:{
        requiredAuth:true
      },
      component:Login
    },
    {
      path:'/person',
      name:'person',
      meta:{
        requiredAuth:true
      },
      component:Personal
    },
    {
      path:'/intention',
      name:'intention',
      meta:{
        requiredAuth:true
      },
      component:intention
    },
    {
      path:'/chainImg',
      name:'chainImg',
      meta:{
        requiredAuth:true
      },
      component:chainImg
    }
  ]
})
router.beforeEach((to, from, next) => {
  // if(to.matched.some(res=>res.meta.requiredAuth)){ //判断是否需要登录权限 to.meta.requiredAuth or to.matched.some(res=>res.meta.requiredAuth)
  //   if(localStorage.getItem('isLogin')){
  //     next();
  //   }else{
  //     next({
  //       path:'/login',
  //       // query:{redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
  //     })
  //   }
  // }else{
  //   next();
  // }
  next();

});
export default router
