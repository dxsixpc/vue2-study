<template>
  <div id="container">
    <div class="demo post" :style="{ fontSize: postFontSize + 'px' }">
      <h3>{{ title }}</h3>
      <button @click="$emit('enlarge', 2)">放大字体</button>
      <button @click="$emit('narrow', 1)">缩小字体</button>
      <p v-for="post in posts" :key="post.id">
        {{ `${post.id}、${post.title}` }}
      </p>
      <span>已完成数量{{ todosCount(true) }}</span>
      <span>未完成数量{{ todosCount(false) }}</span>
      <p v-for="todo in todos" :key="todo.id">
        {{ `${todo.id}、${todo.text}、${todo.done ? '已完成' : ' 未完成'}` }}
      </p>
    </div>
    <input
      class="demo"
      type="text"
      v-on="inputListeners"
      :value="injectValue"
    />
    <button @click="testInject">测试依赖注入</button>
    <div id="layout-container" class="demo">
      <header>
        <slot name="header" :user="user"></slot>
      </header>
      <main>
        <slot>插槽默认值</slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
    <div id="transition" class="demo">
      <button @click="show = !show">切换</button>
      <transition name="fade">
        <p v-if="show">动态切换显示动画</p>
      </transition>
    </div>
    <div>
      <p>vuex管理的count{{ count }}</p>
      <p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
      </p>
    </div>
    <button @click="goBack">返回</button>
  </div>
</template>

<script>
export default {
  name: 'StudyDemo',
  // 从父组件接受到的参数
  props: {
    title: {
      type: String,
      default: '这是默认标题',
    },
    posts: Array,
    postFontSize: Number,
  },
  // 当前组件中使用的数据
  data() {
    return {
      user: {
        firstName: 'pc',
        lastName: 'zhu',
      },
      show: true,
      injectValue: '',
    };
  },
  // 将全局依赖的数据，注入到当前组件
  inject: ['getAppData'],
  // 当前组件定义的一些方法
  methods: {
    testInject() {
      this.injectValue = this.getAppData().title;
    },
    increment() {
      console.log('this.$store: ', this.$store);
      this.$store.commit('increment', 2);
    },
    decrement() {
      // this.$store.dispatch('decrement', 1);
      this.$store.dispatch('promiseDecrement', 2).then((res) => {
        console.log(res);
      });
    },
    goBack() {
      console.log('this.$router: ', this.$router);
      // 返回
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
    },
  },
  // 监听属性，用于监听部分数据的变化，能够使用副作用做一些操作
  watch: {
    // 当show变化时，进行一些副作用操作
    show() {
      this.injectValue = `监听show的变化${this.show}`;
    },
  },
  // 计算属性，用于计算与缓存部分数据
  computed: {
    // 封装与修改监听事件。
    inputListeners() {
      let vm = this;
      return Object.assign({}, this.$listeners, {
        input(event) {
          vm.$emit('input', event.target.value);
        },
      });
    },
    // store中的数据，无需在data中定义，直接在计算属性中暴露出来给组件使用。
    count() {
      return this.$store.state.count;
    },
    todos() {
      return this.$store.state.todos;
    },
    todosCount() {
      // 计算属性传惨，返回一个函数
      return (done) => this.$store.getters.todosCount(done);
    },
  },
};
</script>

<style scoped>
.demo {
  margin-bottom: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
