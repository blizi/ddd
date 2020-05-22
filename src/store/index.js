import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    token:'',
    adminName:'',
    viewTable:[],
    tableHead:[]
  },
  mutations: {
    updateName(state,vale){
      state.adminName = vale
    },
    updateToken(state,vale){
      state.token = vale
    },
    updateViewTable(state,vale){
      state.viewTable = vale
    },
    updateTableHead(state,vale){
      state.tableHead = vale
    },
  },
  actions: {
  },
  plugins:[vuexLocal.plugin],
  modules: {
  }
})
