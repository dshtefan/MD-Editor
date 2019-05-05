import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isPreview: false,
    isContentEditable: true,
    listOfDocs: false,
    contentMD: "",
    activeContent: "md",
    files: [],
    fileName: ""
  },
  mutations: {
      turnView (state, n)  {
         state.isPreview = n
      },
      turnContEd (state, n)  {
         state.isContentEditable = n
      },
      turnList (state, n)  {
         state.listOfDocs = n
      },
      activateContent (state, content) {
         if (content == "md" || content == "html"){
            state.activeContent = content
         }
      },
      saveMD (state, content) {
         state.contentMD = content
      },
      addFiles (state, n)  {
         state.files = n
      },
      addFiles (state, n)  {
         state.files = n
      },
      addFileName(state, name){
         state.fileName = name
      }
  }
})

export default store
