import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isPreview: false,
    isContEd: true,
    listOfDocs: false,
    contentMD: "",
    contentHTML: "",
    activeContent: "md"
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
      },
      activateContent (state, cont) {
         if (cont == "md" || cont == "html"){
            state.activeContent = cont
         }
      },
      saveMD (state, cont) {
         state.contentMD = cont
      },
      saveHTML (state, cont) {
         state.contentHTML = cont
      },
  }
})

export default store
