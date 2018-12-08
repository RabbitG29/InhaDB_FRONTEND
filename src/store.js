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
        authLevel: ''
    },
    plugins: [createPersistedState()],
    getters:{
        isLogged: function(state){
            return state.isLogged
        },
        getId: function(state){
            return state.id
        },
        getToken: function(state){
            return state.token
        },
        getName: function(state){
            return state.name
        },
        getPhone: function(state){
            return state.phone
        },
        getAuthLevel: function(state){
            return state.authLevel
        }
    },
    mutations: {
        logIn: function(state, payload){
            state.isLogged = true
            state.id = payload.id
        },
        logOut: function(state, payload){
            state.isLogged = false
            state.id = ''
        }
    }
});
