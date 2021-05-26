import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import animated from 'animate.css';
// import VueResource from 'vue-resource';

const app = createApp(App);
// step1：引入 axios

app.config.productionTip = false;

app
  .use(Antd)
  .use(animated)
  .use(VueAxios, axios)
  // .use(VueResource)
  .mount('#app');

// step2：把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求,
// 不需要每次都 import一下 axios了，直接使用 $axios 即可
// app.config.globalProperties.$axios = axios;
// step3：使每次请求都会带一个 /api 前缀
// axios.defaults.baseURL = '/api';
