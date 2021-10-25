import shop from '@/api/shop';

export default {
    namespaced: true,
    state: {
        items: [],
    },
    mutations: {
        setProducts(state, products) {
            state.items = products;
        },
        decrementProductInventory(state, product) {
            product.inventory--;
        },
    },
    getters: {
        availableProducts(state) {
            return state.items.filter(product => product.inventory > 0);
        },
        productIsInStock() {
            return function(product) {
                return product.inventory > 0;
            }
        }
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
};
