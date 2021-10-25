<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="product in products" :key="`cart-${product.id}`">
                {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }} 
            </li>
        </ul>
        <p>Total: {{ total | currency }}</p>
        <button :disabled="isCheckoutDisabled" @click="checkout">Checkout</button>
        <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                products: 'cartProducts',
                total: 'cartTotal',
            }),
            ...mapState({
                checkoutStatus: state => state.cart.checkoutStatus,
            }),
            isCheckoutDisabled() {
                return this.total === 0;
            }
        },
        methods: mapActions([ 'checkout' ]),  
    };
</script>
