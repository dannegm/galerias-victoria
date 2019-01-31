<template>
    <div id="app" class="main wrapper">
        <div class="page-loader" :class="{'loaded':loading}"></div>
        <Navbar :routes="routes" :social="social" :contact="contact" />
        <router-view />
        <Footer :contact="contact" :location="location" />
        <ScrollTopButton />
    </div>
</template>

<script>
import { db } from '@/services/firebase'
import '../assets/styles.css'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollTopButton from '../components/ScrollTopButton'

export default {
    components: {
        Navbar,
        Footer,
        ScrollTopButton,
    },
    methods: {
        getContact () {
            return db.collection ('settings').doc ('contact').get().then (snapshot => {
                const contact = snapshot.data();
                this.contact = {
                    ...this.contact,
                    ...contact,
                };
                return Promise.resolve ();
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
        getLocation () {
            return db.collection ('settings').doc ('location').get().then (snapshot => {
                const location = snapshot.data();
                this.location = {
                    ...this.location,
                    ...location,
                };
                return Promise.resolve ();
            });
        },
    },
    async mounted () {
        await this.getContact ();
        await this.getSocial ();
        await this.getLocation ();
    },

    computed: {
        loading () {
            return this.$store.state.loading;
        }
    },
    data () {
        return {
            scrolled: false,
            currentRoute: null,
            routes: {
                ['main']: {
                    name: 'main',
                    displayName: 'Inicio',
                    selected: false,
                    navbar: false,
                },
                ['main.home']: {
                    name: 'main.home',
                    displayName: 'Inicio',
                    selected: false,
                    navbar: true,
                },
                ['main.about']: {
                    name: 'main.about',
                    displayName: 'Nosotros',
                    selected: false,
                    navbar: true,
                },
                ['main.antiques']: {
                    name: 'main.antiques',
                    displayName: 'Arte Fino y Antigüedades',
                    selected: false,
                    navbar: true,
                },
                ['main.contact']: {
                    name: 'main.contact',
                    displayName: 'Contacto',
                    selected: false,
                    navbar: true,
                },
            },

            contact: {
                phones: {
                    one: '',
                    two: '',
                }
            },
            social: {
                facebook: '',
                instagram: '',
                whatsapp: '',
            },
            location: {
                address: '',
                lat: '',
                lng: '',
            }
        }
    }
}
</script>
<style lang="less">
.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome !important;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.fa-1x {
    font-size: 1em !important;
}
</style>