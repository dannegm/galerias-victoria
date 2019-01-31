<template>
    <div class="products-list">
        <section class="main-header" style="background-image:url(/img/slider/slide1.jpg)">
            <header>
                <div class="container">
                    <h1 class="h2 title">Productos</h1>
                </div>
            </header>
        </section>

        <section class="products">
            <div class="container">
                <header class="hidden">
                    <h3 class="h3 title">Product category grid</h3>
                </header>

                <div class="row">
                    <div class="col-md-3 col-xs-12">
                        <div class="filters">
                            <div class="filter-box" :class="{ 'active': showCategoryList }">
                                <div class="title" @click="showCategoryList = !showCategoryList">
                                    Type
                                </div>
                                <div class="filter-content">
                                    <span class="checkbox">
                                        <input type="radio" name="radiogroup-type" id="typeIdAll" checked="checked">
                                        <label for="typeIdAll">Todos</label>
                                    </span>
                                    <span
                                        class="checkbox"
                                        v-for="(cat, index) in categories"
                                        :key="index">
                                        <input type="radio" name="radiogroup-type" :id="cat.uid">
                                        <label :for="cat.uid">{{cat.name}}</label>
                                    </span>
                                </div>
                            </div>

                            <div class="toggle-filters-close btn btn-main">
                                Actualizar filtros
                            </div>
                        </div>
                    </div>

                    <div class="col-md-9 col-xs-12">
                        <div class="row">
                            <div
                                class="col-md-6 col-xs-6"
                                    v-for="(product, index) in products"
                                    :key="index">
                                <article>
                                    <div class="info">
                                        <span>
                                            <a :href="`/product/${product.uid}`" data-title="Quick wiew"><i class="icon icon-eye"></i></a>
                                        </span>
                                    </div>
                                    <div class="btn btn-add">
                                        <i class="icon icon-heart"></i>
                                    </div>
                                    <div class="figure-grid">
                                        <div class="image">
                                            <a :href="`/product/${product.uid}`">
                                                <img :src="product.picture" width="360" />
                                            </a>
                                        </div>
                                        <div class="text">
                                            <h2 class="title h4"><a :href="`/product/${product.uid}`">{{product.name}}</a></h2>
                                            <span class="description clearfix">{{product.description}}</span>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { db } from '@/services/firebase'
export default {
    name: 'products-list',
    methods: {
        getCategories () {
            return db.collection ('categories').get ().then (categoriesSnapshot => {
                this.categories = categoriesSnapshot.docs
                    .map (doc => doc.data());
                return new Promise ((result, reject) => {
                    result (this.categories);
                });
            });
        },

        getProducts () {
            return db.collection ('products').get ().then (productsSnapshot => {
                this.products = productsSnapshot.docs
                    .map (doc => doc.data());
                return new Promise ((result, reject) => {
                    result (this.products);
                });
            });
        },
    },
    async mounted () {
        await this.getCategories ();
        await this.getProducts ();
    },
    data () {
        return {
            showCategoryList: true,
            categories: [],
            products: [],
        }
    }
}
</script>
<style lang="less" scoped>
.filter-box.active .filter-content {
    display: block;
}
.filters .filter-box .title {
    font-size: 16px !important;
    font-weight: normal;
}
</style>
