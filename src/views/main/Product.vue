<template>
    <div class="individual-product">
        <section class="main-header" style="background-image:url(/img/slider/slide1.jpg)">
            <header>
                <div class="container">
                    <h1 class="h2 title">{{product.name}}</h1>
                    <ol class="breadcrumb breadcrumb-inverted">
                        <li><a href="/"><span class="icon icon-home"></span></a></li>
                        <li><a :href="`/products?cat=${product.category.name}`">{{product.category.name}}</a></li>
                        <li><a :href="`/product/${product.uid}`">Descripción del producto</a></li>
                    </ol>
                </div>
            </header>
        </section>

        <section class="product">
            <div class="main">
                <div class="container">
                    <div class="row product-flex">
                        <div class="col-md-4 col-sm-12 product-flex-info">
                            <div class="clearfix">
                                <h1 class="title" :data-title="product.category.name">{{product.name}}</h1>

                                <div class="clearfix">
                                    <div class="price">
                                        <span class="h3">
                                            $ {{product.price}}
                                        </span>
                                    </div>
                                    <hr />
                                    <div class="info-box">
                                        <span><strong>Marca</strong></span>
                                        <span>{{product.brand}}</span>
                                    </div>
                                    <div class="info-box">
                                        <span><strong>Disponibilidad</strong></span>
                                        <span v-if="product.available"><i class="fa fa-check-square-o"></i> Disponible</span>
                                        <span v-else><i class="fa fa-truck"></i> No disponible</span>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-8 col-sm-12 product-flex-gallery">
                            <div class="owl-product-gallery open-popup-gallery">
                                <img :src="product.picture" alt="" height="500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="info">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" :class="{
                                    'active': tabs.description.active
                                }">
                                    <a role="tab" @click="tabs.description.active = true; tabs.more.active = false;">
                                        <i class="icon icon-heart"></i>
                                        &nbsp;<span>Descripción</span>
                                    </a>
                                </li>
                                <li role="presentation" :class="{
                                    'active': tabs.more.active
                                }">
                                    <a role="tab" @click="tabs.description.active = false; tabs.more.active = true;">
                                        <i class="icon icon-user"></i>
                                        &nbsp;<span>Más de {{product.category.name}}</span>
                                    </a>
                                </li>
                            </ul>

                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane" :class="{
                                    'active': tabs.description.active
                                }">
                                    <div class="content">
                                        <h3>Descripción</h3>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="comments">
                                                    <div class="comment-wrapper">
                                                        <div class="comment-desc">
                                                            <br /><br />
                                                            <p v-html="product.description"></p>
                                                            <br /><br />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane" :class="{
                                    'active': tabs.more.active
                                }">
                                    <div class="content">
                                        <h3>Collection de {{product.category.name}}</h3>
                                        <div class="products">
                                            <div class="row">
                                                <div class="col-md-6 col-xs-6"
                                                    v-for="(pdct, index) in products"
                                                    :key="index">
                                                    <article>
                                                        <div class="figure-grid">
                                                            <div class="image">
                                                                <a :href="`/product/${pdct.uid}`">
                                                                    <img :src="pdct.picture" width="360" />
                                                                </a>
                                                            </div>
                                                            <div class="text">
                                                                <h4 class="title"><a :href="`/product/${pdct.uid}`">{{pdct.name}}</a></h4>
                                                                <sup>{{pdct.category.name}}</sup>
                                                                <span class="description clearfix">{{pdct.description}}</span>
                                                            </div>
                                                        </div>
                                                    </article>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
    name: 'individual-product',
    methods: {
        getProduct () {
            if (typeof this.$route.params.uid == 'undefined') {
                this.$router.push ({ path: `/products` });
                return;
            }
            const uid = this.$route.params.uid;

            return db.collection ('products').doc (uid).get().then (snapshot => {
                console.log(snapshot);
                if (!snapshot.exists) {
                    this.$router.push ({ path: `/products` });
                    return;
                }

                this.product = snapshot.data();
                return new Promise ((result, reject) => {
                    result (this.product);
                });
            });
        },

        getProducts () {
            return db.collection ('products').where('category.uid', '==', this.product.category.uid).get ().then (productsSnapshot => {
                this.products = productsSnapshot.docs
                    .map (doc => doc.data());
                return new Promise ((result, reject) => {
                    result (this.products);
                });
            });
        },
    },
    async mounted () {
        await this.getProduct ();
        await this.getProducts ();
    },
    data () {
        return {
            product: null,
            products: [],
            tabs: {
                description: {
                    active: true,
                },
                more: {
                    active: false,
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.nav-tabs {
    margin-top: -97px;
}
</style>