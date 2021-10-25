import Vuex from 'vuex';
import Vue from 'vue';

import shop from '@/api/shop';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        cart: [],
        checkoutStatus: '',
    },
    getters: {
        availableProducts(state) {
            return state.products.filter(product => product.inventory > 0);
        },
        cartProducts(state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.id === cartItem.id);

                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity,
                };
            })
        },
        cartTotal(state, getters) {
            return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
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
        addProductToCart({ commit, state }, product) {
            if (product.inventory > 0) {
                const cartItem = state.cart.find(item => item.id === product.id);

                if (!cartItem) {
                    commit('pushProductToCart', product.id);
                } else {
                    commit('incrementItemQuantity', cartItem);
                };

                commit('decrementProductInventory', product);

            };
        },
        checkout({ state, commit }) {
            function handleSuccess() {
                commit('emptyCart');
                commit('setCheckoutStatus', 'success');
            }

            function handleFailure() {
                commit('setCheckoutStatus', 'fail');
            }

            shop.buyProducts(state.cart, handleSuccess, handleFailure);
        },
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        pushProductToCart(state, productId) {
            state.cart.push({ id: productId, quantity: 1 });
        },
        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++;   
        },
        decrementProductInventory(state, product) {
            product.inventory--;
        },
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status;
        },
        emptyCart(state) {
            state.cart = [];
        }
    }
});
