import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import StudyDemo from './demo/StudyDemo.vue';

Vue.use(VueRouter);

const routes = [
  // 可以传动态路径参数，冒号开头
  // { path: '/hello-world:id', component: HelloWorld },

  {
    path: '/hello-world',
    component: HelloWorld,
    children: [
      // 当 /user/:id 匹配成功，
      // HelloWorld 会被渲染在 HelloWorld 的 <router-view> 中
      // { path: '', component: HelloWorld },
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'demo',
        component: StudyDemo,
      },
    ],
  },
  { path: '/element-ui', component: () => import('./demo/ElementUI.vue') },
  // 会匹配以 `/user-` 开头的任意路径
  { path: '/user-*' },
  // 会匹配所有路径,当其他路径都不满足时，匹配
  { path: '*' },
];

export default routes;
