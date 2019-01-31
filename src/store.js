import Vue from 'vue'
import Vuex from 'vuex'

Vue.use (Vuex)

export default new Vuex.Store ({
    state: {
        loading: false,
    },
    mutations: {
        loading (state, is) {
            state.loading = is;
        }
    },
    actions: {

    }
})
