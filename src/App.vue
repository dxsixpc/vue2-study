<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>
      <router-link class="router" to="/element-ui">element-ui</router-link>
      <router-link class="router" to="/hello-world">Hello World！</router-link>
      <router-link class="router" to="/hello-world/demo"
        >Hello World！- demo</router-link
      >
    </p>

    <router-view></router-view>

    <StudyDemo
      v-bind="$attrs"
      :title="title"
      :posts="posts"
      :postFontSize="postFontSize"
      @input="input"
      @enlarge="enlarge($event)"
      @narrow="postFontSize - $event"
    >
      <template #header="{ user }"> 这是头部插槽 {{ user.lastName }} </template>
      这是父组件传入的主内容插槽值
      <template #footer>这是尾部插槽</template>
      <template #[dynamicSlotName]>这是动态插槽</template>
    </StudyDemo>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import StudyDemo from './demo/StudyDemo.vue';

export default {
  name: 'App',
  data() {
    return {
      dynamicSlotName: 'footer',
      title: '这是父组件传入的标题',
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' },
      ],
      postFontSize: 1,
    };
  },
  provide() {
    let appVm = this;
    return {
      getAppData() {
        return appVm;
      },
    };
  },
  watch: {
    $route(to, from) {
      console.log('路由监听 ', to, from);
      // 对路由变化作出响应...
    },
  },
  methods: {
    enlarge(value) {
      this.postFontSize += value;
    },
    input(value) {
      console.log('value: ', value);
    },
  },
  components: {
    // HelloWorld
    StudyDemo,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.router {
  margin: 10px;
}
</style>
