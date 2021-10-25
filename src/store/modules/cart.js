import shop from '@/api/shop';

export default {
    state: {
        items: [],
        checkoutStatus: '',
    },
    getters: {
        cartProducts(state, getters, rootState) {
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(product => product.id === cartItem.id);

                return {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity,
                };
            })
        },
        cartTotal(state, getters) {
            return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
        },
    },
    mutations: {
        pushProductToCart(state, productId) {
            state.items.push({ id: productId, quantity: 1 });
        },
        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++;   
        },
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status;
        },
        emptyCart(state) {
            state.items = [];
        }
    },
    actions: {
        addProductToCart({ commit, state, getters, rootState }, product) {
            // if the user adds a new product to the cart after a successful checkout, the checkout status
            // should go back to its initial state
            commit('setCheckoutStatus', '');
    
            if (getters.productIsInStock(product)) {
                const cartItem = state.items.find(item => item.id === product.id);
    
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
    
            shop.buyProducts(state.items, handleSuccess, handleFailure);
        },
    }
};
