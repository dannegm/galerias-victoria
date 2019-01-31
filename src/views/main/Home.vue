<template>
    <div class="home">
        <Slider />
        <Icons />

        <section class="products">
            <div class="container">
                <header>
                    <div class="row">
                        <div class="col-md-offset-2 col-md-8 text-center">
                            <h2 class="title">Últimas Adquisiciones</h2>
                        </div>
                    </div>
                </header>

                <div class="row">
                    <div
                        class="col-md-4 col-xs-6"
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
                                </div>
                            </div>
                        </article>
                    </div>
                </div>

                <div class="wrapper-more">
                    <a href="/products" class="btn btn-main">Ver más</a>
                </div>
            </div> <!--/container-->
        </section>

        <Stretcher :items="stretcherItems" />

        <section class="instagram">
            <header>
                <div class="container">
                    <div class="row">
                        <div class="col-md-offset-2 col-md-8 text-center">
                            <h2 class="h2 title">Síguenos en <i class="fa fa-instagram fa-1x"></i> Instagram</h2>
                            <div class="text">
                                <p>@{{social.instagram}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div class="gallery clearfix">
                <a class="item" href="#">
                    <img src="assets/images/square-1.jpg" alt="Alternate Text" />
                </a>
                <a class="item" href="#">
                    <img src="assets/images/square-2.jpg" alt="Alternate Text" />
                </a>
                <a class="item" href="#">
                    <img src="assets/images/square-3.jpg" alt="Alternate Text" />
                </a>
                <a class="item" href="#">
                    <img src="assets/images/square-4.jpg" alt="Alternate Text" />
                </a>
                <a class="item" href="#">
                    <img src="assets/images/square-5.jpg" alt="Alternate Text" />
                </a>
                <a class="item" href="#">
                    <img src="assets/images/square-6.jpg" alt="Alternate Text" />
                </a>
            </div>
        </section>
    </div>
</template>

<script>
import { db } from '@/services/firebase'

import Slider from '@/components/Slider'
import Icons from '@/components/Icons'
import Stretcher from '@/components/Stretcher'

export default {
    name: 'home',
    components: {
        Slider,
        Icons,
        Stretcher,
    },
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
        getSlots () {
            return db.collection ('stretcher').get ().then (slotsSnapshot => {
                this.stretcherItems = slotsSnapshot.docs
                    .map (doc => doc.data())
                    .sort((a, b) => a.order - b.order);
                return new Promise ((result, reject) => {
                    result (this.slots);
                });
            });
        },
        getProducts () {
            return db.collection ('products').limit(6).get ().then (productsSnapshot => {
                this.products = productsSnapshot.docs
                    .map (doc => doc.data());
                return new Promise ((result, reject) => {
                    result (this.products);
                });
            });
        },
        getSocial () {
            return db.collection ('settings').doc ('social').get().then (snapshot => {
                const social = snapshot.data();
                this.social = {
                    ...this.social,
                    ...social,
                };
                return Promise.resolve ();
            });
        },
    },
    async mounted () {
        await this.getCategories ();
        await this.getSlots ();
        await this.getProducts ();
        await this.getSocial ();
    },
    data () {
        return {
            loaded: false,
            products: [],
            categories: [],
            stretcherItems: [],
            social: {
                processing: false,
                facebook: '',
                instagram: '',
                whatsapp: '',
            },
        }
    }
}
</script>

