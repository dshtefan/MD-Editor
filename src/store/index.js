import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isPreview: false
  },
  mutations: {
  	turnView: state => state.isPreview = !state.isPreview
  }
})

export default store
