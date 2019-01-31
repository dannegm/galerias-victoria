<template>
    <div class="antiques">
        <section class="main-header" style="background-image:url(/img/slider/slide1.jpg)">
            <header class="hidden">
                <div class="container">
                    <h1 class="h2 title">Categorías</h1>
                </div>
            </header>
        </section>

        <section class="products">
            <div class="container">
                <header>
                    <div class="row">
                        <div class="col-md-offset-2 col-md-8 text-center">
                            <h2 class="title">Categorías</h2>
                            <div class="text">
                                <p>Selecciona la categoría</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div class="row">
                    <div
                        class="col-md-4 col-xs-6"
                        v-for="(cat, index) in categories"
                        :key="index">
                        <article>
                            <div class="figure-block">
                                <div class="image">
                                    <a :href="`/products?cat=${cat.name}`">
                                        <img :src="cat.background" width="360" />
                                    </a>
                                </div>
                                <div class="text">
                                    <h2 class="title h4"><a href="#">{{cat.name}}</a></h2>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { db } from '@/services/firebase'
export default {
    name: 'antiques',
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
    },
    async mounted () {
        await this.getCategories ();
    },
    data () {
        return {
            categories: [],
        }
    }
}
</script>
