<template>
    <v-app id="login" v-if="!auth.is">
        <v-layout row align-center justify-center>
            <v-flex v-if="!auth.unauthorized" sm3 class="login-container">
                <v-icon x-large class="icon-logo">fas fa-th-large</v-icon>
                <h1 class="display-1">Dashboard</h1>
                <p class="subheading">Inicia sesión con tu cuenta de <b class="indigo--text">Google</b> para acceder al <b class="purple--text">dashboard</b>.</p>

                <v-btn round large color="error" @click="requestLogin">
                    Inicia con Google
                    <v-icon right>fab fa-google</v-icon>
                </v-btn>
            </v-flex>
            <v-flex v-if="auth.unauthorized" sm3 mg2 class="login-container">
                <v-avatar :size="76" color="purple">
                    <img :src="user.photoURL" />
                </v-avatar>
                <h1 class="display-1">Bienvenido</h1>
                <p class="subheading">No tienes permisos para acceder al <b class="purple--text">dashboard</b>, por favor contacta con tu administrador.</p>

                <v-btn round large color="error" @click="requestLogin">
                    Cambiar de cuenta
                    <v-icon right>fab fa-google</v-icon>
                </v-btn>
                <br />
                <v-btn flat small @click="requestOut">Cerrar sesión</v-btn>
            </v-flex>
        </v-layout>
    </v-app>
    <v-app id="dashboard" v-else>
        <v-navigation-drawer id="drawer" app clipped :value="drawer">
            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img :src="user.photoURL" />
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{user.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-list dense>
                <v-divider class="hidden"></v-divider>
                <template
                    v-for="route in Object.values(routes).filter(i => i.navbar)">
                    <v-list-tile
                        @click="go(route.name)" :key="`${route.name}.menu`">
                        <v-list-tile-action>
                            <v-icon :class="{'indigo--text': route.selected}">
                                {{ route.icon }}
                            </v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title :class="{'indigo--text': route.selected}">
                                {{ route.displayName }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider v-if="route.divider" :key="`${route.name}.divider`"></v-divider>
                </template>

                <v-list-tile @click="requestOut">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            Salir
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <v-card flat transition="slide-y-reverse-transition" class="route-container">
                <v-toolbar color="primary" dark extended flat>
                    <v-btn icon @click.stop="drawer = !drawer">
                        <v-icon>menu</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat href="/" target="_blank">
                        Ir a la página
                        <v-icon right>launch</v-icon>
                    </v-btn>
                    <v-btn icon @click.stop="requestOut">
                        <v-icon>exit_to_app</v-icon>
                    </v-btn>
                </v-toolbar>
                <router-view />
            </v-card>
        </v-content>
    </v-app>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import '@/plugins/vuetify';
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use (Vuetify, { iconfont: 'mdi' })

import { firebase, db, auth } from '@/services/firebase';
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider ();

export default {
    methods: {
        async requestLogin () {
            return await auth.signInWithPopup (GoogleAuthProvider)
        },
        async requestOut () {
            this.auth.is = false;
            this.auth.unauthorized = false;
            return await auth.signOut ()
        },
        setRoute () {
            this.currentRoute = this.$router.currentRoute.name
            Object.values (this.routes).forEach (route => {
                this.routes [route.name].selected = false
            })
            this.routes [this.currentRoute].selected = true
        },
        go (route) {
            this.$router.push ({ name: route })
        }
    },
    async mounted () {
        this.setRoute ()
        auth.onAuthStateChanged (async (user) => {
            if (!this.auth.is) {
                const usersSnapshot = await db.collection ('users')
                    .where('email', '==', user.email).get ();
                const firstUserFound = usersSnapshot.docs[0];

                this.auth.uid = user.uid;
                this.user = {
                    uid : user.uid,
                    email: user.email,
                    name: user.displayName,
                    role: 'none',
                    registered_at: new Date (),
                    photoURL: user.photoURL,
                    active: true,
                };

                if (typeof firstUserFound == 'undefined') {
                    this.auth.is = false;
                    this.auth.unauthorized = true;
                } else {
                    this.auth.is = true;
                    this.auth.unauthorized = false;
                    if (firstUserFound.data().uid != user.uid) {
                        const tempUID = firstUserFound.data().uid;
                        await db.collection ('users').doc (tempUID).delete ();
                    }
                    await db.collection ('users').doc (user.uid).set (this.user);
                }
            }
        })
    },
    watch: {
        $route () {
            this.setRoute ()
        },
    },
    data () {
        return {
            drawer: true,
            auth: {
                is: false,
                uid: null,
                unauthorized: false,
            },
            user: {
                photoURL: `${process.env.BASE_URL}img/avatar-placeholder.png`,
            },

            title: 'Panel de Administración',
            currentRoute: null,
            routes: {
                ['admin']: {
                    name: 'admin',
                    displayName: 'Root',
                    icon: 'dashboard',
                    selected: false,
                    divider: false,
                    navbar: false,
                },

                ['admin.resume']: {
                    name: 'admin.resume',
                    displayName: 'Resumen',
                    icon: 'dashboard',
                    selected: false,
                    divider: true,
                    navbar: true,
                },
                /* */
                ['admin.slider']: {
                    name: 'admin.slider',
                    displayName: 'Slide Show',
                    icon: 'view_carousel',
                    selected: false,
                    divider: false,
                    navbar: true,
                },
                ['admin.categories']: {
                    name: 'admin.categories',
                    displayName: 'Categorías',
                    icon: 'turned_in',
                    selected: false,
                    divider: false,
                    navbar: true,
                },
                ['admin.products']: {
                    name: 'admin.products',
                    displayName: 'Productos',
                    icon: 'shopping_cart',
                    selected: false,
                    divider: true,
                    navbar: true,
                },
                ['admin.about']: {
                    name: 'admin.about',
                    displayName: 'Nosotros',
                    icon: 'class',
                    selected: false,
                    divider: false,
                    navbar: true,
                },
                ['admin.contact']: {
                    name: 'admin.contact',
                    displayName: 'Contacto',
                    icon: 'chat',
                    selected: false,
                    divider: true,
                    navbar: true,
                },
                /*
                ['admin.settings']: {
                    name: 'admin.settings',
                    displayName: 'Configuración',
                    icon: 'settings',
                    selected: false,
                    navbar: true,
                },
                /**/
                ['admin.users']: {
                    name: 'admin.users',
                    displayName: 'Usuarios',
                    icon: 'person',
                    selected: false,
                    divider: true,
                    navbar: true,
                },
            }
        }
    }
}
</script>
<style lang="less" scoped>
#login {
    .login-container {
        text-align: center;
        .icon-logo, .v-avatar {
            font-size: 64px !important;
            color: #eaeaea;
            margin-bottom: 32px;
        }
        .subheading {
            color: #6b6b6b;
        }
        .caption {
            margin-top: 10px;
        }
    }
}
#drawer {
    .hidden {
        visibility: hidden !important;
    }
    .v-divider {
        margin: 0.4em 0 !important;
    }
}

.route-container {
    margin-bottom: 4em !important;
}
</style>
