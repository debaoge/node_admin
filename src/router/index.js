import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import MainBox from '@/views/MainBox.vue';
import routesConfig from './config';
import store from '@/store';
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/mainbox',
    name: 'mainbox', //必须有name属性 否则 孩子 找不到
    component: MainBox,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next()
  } else {
    if (!localStorage.getItem("token")) {
      next({
        path: '/login'
      })
    } else {
      if(!store.state.routesAdded){
        ConfigRouter()
        next(to.fullPath)
      }else{
        next()
      }
    }
  }
  //console.log(router.getRoutes());
})

const ConfigRouter = () => {
  routesConfig.forEach(item => router.addRoute("mainbox", item))
  store.commit("changeRoutesAdded", true)
}

export default router;
