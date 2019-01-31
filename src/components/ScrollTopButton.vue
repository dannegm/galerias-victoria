<template>
    <div
        class="scroll-top"
        @click="scrollTop"
        :class="{
            'visible': scrolled,
            'active': isBottom,
        }">
        <i class="icon icon-chevron-up"></i>
    </div>
</template>

<script>
import jQuery from 'jquery'
export default {
    name: 'ScrollTopButton',
    methods: {
        scrollTop () {
            jQuery ('html,body').animate ({
                scrollTop: jQuery('body').offset().top
            }, 1000);
        },
        handleScroll () {
            if (window.scrollY > 150) {
                this.scrolled = true;
            } else {
                this.scrolled = false;
            }
            this.isBottom = jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height();
        }
    },
    mounted () {
        this.$store.commit ('loading', true);
    },
    beforeMount () {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    data () {
        return {
            scrolled: false,
            isBottom: false,
        }
    }
}
</script>
