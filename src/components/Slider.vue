<template>
    <section class="header-content">
        <div class="owl-slider">
            <div
                class="item"
                v-for="(slide, index) in slides"
                :key="index"
                :style="`background-image:url(${slide.background})`">
                <div class="box">
                    <div class="container">
                        <h2 class="title animated h1 fadeInDown">{{slide.title}}</h2>
                        <div class="animated fadeInUp">{{slide.subtitle}}</div>
                        <div class="animated fadeInUp">
                            <a :href="slide.action.href" class="btn btn-clean" >{{slide.action.text}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { db } from '@/services/firebase'
import jQuery from 'jquery'; const $ = jQuery;
import '../plugins/jquery.owl.carousel.js'

export default {
    name: 'Slider',
    methods: {
        getSlides () {
            return db.collection ('slideshow').get ().then (slidesSnapshot => {
                this.slides = slidesSnapshot.docs.map (doc => doc.data());
                return new Promise ((result, reject) => {
                    result (this.slides);
                });
            });
        },
        init () {
            const n = $('.owl-slider');
            const arrowIcons = [
                '<span class="icon icon-chevron-left"></span>',
                '<span class="icon icon-chevron-right"></span>',
            ];

            $(n).owlCarousel ({
                autoHeight: false,
                navigation: true,
                navigationText: arrowIcons,
                items: 1,
                singleItem: true,
                addClassActive: true,
                transitionStyle: 'fadeUp',
                afterMove: animatetCaptions,
                autoPlay: 5000,
                stopOnHover: false
            });

            const animatetCaptions = () => {
                setTimeout (() => {
                    const an = $('.animated');
                    an.removeClass ('animated');
                    setTimeout (() => {
                        an.addClass ('animated');
                    }, 100);
                }, 5000);
            };
            animatetCaptions ();
        }
    },
    mounted () {
        this.getSlides ().then (() => {
            this.init ();
        });
    },
    data () {
        return {
            slides: [],
        }
    }
}
</script>

<style lang="less" scoped>
.owl-slider {
    background: #07364f;
}
</style>

