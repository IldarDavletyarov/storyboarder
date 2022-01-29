import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stories: [
      {
        id: 1,
        name: 'Example',
        data: 'Привет! Это пример истории\nБыл буратино с большим носом\nПустили его на дрова'
      }
    ],
    plainText: 'Привет, это простой пример истории.\nВидит медведь, машина горит.\nСел в машину и сгорел.',
    currentTab: 'Flow chart',
  },
  mutations: {
    load(state, payload) {
      state.stories.push(payload);
    },
    updatePlainText(state, payload) {
      state.plainText = payload;
    },
    updateCurrentTab(state, payload) {
      state.currentTab = payload;
    },
  },
  actions: {
    load({ commit }, payload) {
      commit('load', payload);
    },
    updatePlainText({ commit }, payload) {
      commit('updatePlainText', payload);
    },
    updateCurrentTab({ commit }, payload) {
      commit('updateCurrentTab', payload);
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
