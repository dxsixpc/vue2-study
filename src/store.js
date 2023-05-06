import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const moduleA = {
  state: () => ({
    count: 0,
  }),
  mutations: {
    increment(state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++;
    },
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
    sumWithRootCount(state, getters, rootState) {
      return state.count + rootState.count;
    },
  },
  actions: {
    incrementIfOddOnRootSum({ state, commit, rootState }) {
      // rootState中可以拿到根状态的数据
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment');
      }
    },
  },
};

const moduleB = {
  state: () => ({}),
  mutations: {},
  actions: {},
};

const store = new Vuex.Store({
  // 可以将多个状态拆分，便于管理大型复杂状态
  modules: {
    a: moduleA,
    // 使用store.state.b获取内部的state。mutations等全部合并到全局使用 与全局的调用方法一致
    b: moduleB,
  },
  state: {
    count: 0,
    todos: [
      { id: 11, text: '...', done: true },
      { id: 21, text: '...', done: true },
      { id: 31, text: '...', done: false },
    ],
  },
  // 载荷，事件。 使用store.commit触发 .用于对state里的数据进行处理
  mutations: {
    increment(state, payload) {
      state.count += payload;
    },
    decrement(state, payload) {
      state.count -= payload;
    },
  },
  // actions提交的是mutations。使用 store.dispatch触发。
  actions: {
    increment(context, payload) {
      context.commit('increment', payload);
    },
    decrement({ commit }, payload) {
      // 可以使用异步操作
      setTimeout(() => {
        commit('decrement', payload);
      }, 1000);
    },
    promiseDecrement({ dispatch, commit, state }, payload) {
      // 可以使用promise。 使dispatch能够使用then调用，确定异步完成
      return new Promise((resolve) => {
        setTimeout(() => {
          if (state.count <= 10) {
            // 在actions中，还可以调用dispatch
            dispatch('increment', 2);
          } else {
            commit('decrement', payload);
          }
          resolve('success');
        }, 1000);
      });
    },
    // 使用async与await
    async actionA({ commit, dispatch }) {
      commit('gotData', await dispatch('promiseDecrement'));
    },
  },
  // 类似于vue的compute属性，对state里的数据计算处理后返回
  getters: {
    // 必须是函数
    count: () => 0,
    // 获取已完成的任务列表
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
    // 未完成的任务列表
    undoneTodos: (state) => {
      return state.todos.filter((todo) => !todo.done);
    },
    // 根据传入的参数，返回已完成或未完成的任务列表的长度。可以传惨
    todosCount: (state, getters) => (done) => {
      return done ? getters.doneTodos.length : getters.undoneTodos.length;
    },
  },
});

export default store