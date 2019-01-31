<template>
    <nav class="navbar-fixed" :class="{'navbar-sticked':scrolled}">
        <div class="container">
            <div class="navigation navigation-top clearfix">
                <ul>
                    <li><a :href="social.facebook"><i class="fa fa-facebook"></i></a></li>
                    <li><a :href="`https://instagram.com/${social.instagram}`"><i class="fa fa-instagram"></i></a></li>
                    <li><a :href="`https://wa.me/52${social.whatsapp}`"><i class="fa fa-whatsapp"></i></a></li>

                    <li><a href="#" class="open-search"><i class="icon icon-magnifier"></i></a></li>
                    <li><a href="#"><i class="icon icon-heart"></i></a></li>
                </ul>
            </div>

            <div class="navigation navigation-main">
                <a href="/" class="logo"><img src="/img/logo.svg" /></a>
                <a href="#" class="open-menu"><i class="icon icon-menu"></i></a>

                <div class="floating-menu">
                    <div class="close-menu-wrapper">
                        <span class="close-menu"><i class="icon icon-cross"></i></span>
                    </div>

                    <ul>
                        <li
                            v-for="route in Object.values(routes).filter (i => i.navbar)"
                            :key="route.name"
                            :class="{'is-active': route.selected}">
                            <a href="#" @click="go(route.name)">{{route.displayName}}</a>
                        </li>
                        <li><a :href="`tel:+52${contact.phones.one}`"><i class="fa fa-phone"></i> {{contact.phones.one | phone}}</a></li>
                    </ul>
                </div>
            </div>

            <div class="search-wrapper">
                <input class="form-control" placeholder="Search..." />
                <button class="btn btn-main btn-search">Go!</button>
            </div>
        </div>
    </nav>
</template>

<script>
import { db } from '@/services/firebase'

export default {
    name: 'Navbar',
    props: [
        'routes',
        'social',
        'contact'
    ],
    methods: {
        setRoute () {
            this.currentRoute = this.$router.currentRoute.name
            Object.values (this.routes).forEach (route => {
                this.routes [route.name].selected = false
            })
            this.routes [this.currentRoute].selected = true
        },
        go (route) {
            this.$router.push ({ name: route });
        },
        handleScroll () {
            if (window.scrollY > 94) {
                this.scrolled = true;
            } else {
                this.scrolled = false;
            }
        },
    },
    beforeMount () {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    watch: {
        $route () {
            this.setRoute ()
        },
    },
    data () {
        return {
            scrolled: false,
        }
    }
}
</script>
