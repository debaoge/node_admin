import Login from '@/views/Login.vue';
import MainBox from '@/views/MainBox.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import RouterConfig  from './config';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: MainBox,
  },
  // mainbox 的孩子路由将根据权限动态添加
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 动态添加路由的函数
const addDynamicRoutes = () => {
  RouterConfig.forEach((item) => {
    // 检查路由是否已经存在
    const routeExists = router.getRoutes().some((route) => route.path === `/mainbox/${item.path}`);
    if (!routeExists) {
      router.addRoute('mainbox', item);
    }
  });
};

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next(); // 访问登录页，直接放行
  } else {
    if (!localStorage.getItem('token')) {
      next({ path: '/login' }); // 未登录，重定向到登录页
    } else {
      // 已登录，动态添加路由
      addDynamicRoutes();
      next();
    }
  }
});

export default router;