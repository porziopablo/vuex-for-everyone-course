import shop from '@/api/shop';

export default {
    fetchProducts({ commit }) {
        return new Promise(resolve => {
            shop.getProducts(products => { 
                commit('setProducts', products);
                resolve();
            });
        });
    },
    addProductToCart({ commit, state, getters }, product) {
        // if the user adds a new product to the cart after a successful checkout, the checkout status
        // should go back to its initial state
        commit('setCheckoutStatus', '');

        if (getters.productIsInStock(product)) {
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
};
