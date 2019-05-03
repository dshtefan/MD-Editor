import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isPreview: false,
    isContEd: true,
    listOfDocs: false
  },
  mutations: {
  	turnView (state, n)  {
      state.isPreview = n
   },
   turnContEd (state, n)  {
      state.isContEd = n
   },
   turnList (state, n)  {
      state.listOfDocs = n
   }
  }
})

export default store
