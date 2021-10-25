import Vuex from 'vuex';
import Vue from 'vue';

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
        fetchProducts() {

        }
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        }
    }
});
