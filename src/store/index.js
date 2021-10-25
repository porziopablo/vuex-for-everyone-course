import Vuex from 'vuex';
import Vue from 'vue';

import shop from '@/api/shop';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
    },
    getters: {
        availableProducts(state) {
            return state.products.filter(product => product.inventory > 0);
        },
    },
    actions: {
        fetchProducts({ commit }) {
            return new Promise(resolve => {
                shop.getProducts(products => { 
                    commit('setProducts', products);
                    resolve();
                });
            });
        },
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        }
    }
});
