<template>
    <div>
        <h1>Product List</h1>
        <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="loading">
        <ul v-else>
            <li v-for="product in products" :key="product.id">{{ product.title }} - {{ product.price | currency }} - {{ product.inventory }}
                <button
                    :disabled="!productIsInStock(product)"
                    @click="addProductToCart(product)"
                >
                    Add to cart
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {
                loading: false,
            };
        },
        methods: mapActions({
            fetchProducts: 'products/fetchProducts',
            addProductToCart: 'cart/addProductToCart',
        }),
        computed: {
            ...mapState('products', { 
                products: state => state.items, 
            }),
            ...mapGetters({ productIsInStock: 'products/productIsInStock' }),
        },
        created() {
            this.loading = true;
            this.fetchProducts().then(() => { this.loading = false });
        },
    };
</script>
