<template>
    <section class="owl-icons-wrapper owl-icons-frontpage">
        <header class="hidden">
            <h2>Categorías</h2>
        </header>

        <div class="container">
            <div class="owl-icons">
                <a
                    :href="`/antiques?cat=${cat.name}`"
                    v-for="(cat, index) in categories"
                    :key="index">
                    <figure>
                        <i class="fo" :class="`fo-${cat.icon}`"></i>
                        <figcaption>{{cat.name}}</figcaption>
                    </figure>
                </a>
            </div>
        </div>
    </section>
</template>

<script>
import { db } from '@/services/firebase'
import jQuery from 'jquery'; const $ = jQuery;
import '../plugins/jquery.owl.carousel.js'

export default {
    name: 'Icons',
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
        init () {
            const n = $('.owl-icons');
            const arrowIcons = [
                '<span class="icon icon-chevron-left"></span>',
                '<span class="icon icon-chevron-right"></span>',
            ];

            $(n).owlCarousel({
                autoHeight: false,
                pagination: false,
                navigation: true,
                navigationText: arrowIcons,
                items: 6,
                itemsDesktop: [1199, 5],
                itemsDesktopSmall: [979, 5],
                itemsTablet: [768, 4],
                itemsTabletSmall: false,
                itemsMobile: [479, 3],
                addClassActive: true,
                autoPlay: 5500,
                stopOnHover: true
            });
        }
    },
    mounted: function() {
        this.getCategories ().then (() => {
            this.init ();
        });
    },
    data () {
        return {
            categories: [],
        }
    }
}
</script>
