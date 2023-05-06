import './public-path';
import Vue from 'vue';
// import { Button } from 'element-ui';
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import App from './App.vue';
import store from './store';
import VueRouter from 'vue-router';
import routes from './router';
import './element-variables.scss'

Vue.use(ElementUI)

// element-ui的国际化
locale.use(lang)
// element-ui的全局配置
// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
// Vue.component(Button.name, Button);
// Vue.use(ElementUI);

Vue.config.productionTip = false;

let router = null;
let instance = null;

function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/',
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  // router = null;
}
