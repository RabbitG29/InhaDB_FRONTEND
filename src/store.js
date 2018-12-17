import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
/* eslint-disable */
export const store = new Vuex.Store({
    state:{
        isLogged: false,
        id: '',
        token: '',
        name: '',
        phone: '',
        cand: '',
        ec: ''
    },
    plugins: [createPersistedState()],
    getters:{
        isLogged: function(state){
            return state.isLogged
        },
        getId: function(state){
            return state.id
        },
        getEc: function(state){
            return state.ec
        },
        getName: function(state){
            return state.name
        },
        getPhone: function(state){
            return state.phone
        },
        getCand: function(state){
            return state.cand
        }
    },
    mutations: {
        logIn: function(state, payload){
            state.isLogged = true
            state.id = payload.id
            state.ec = payload.ec
            state.cand = payload.cand
        },
        logOut: function(state, payload){
            state.isLogged = false
            state.id = ''
        }
    }
});
