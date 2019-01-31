import Vue from 'vue'
import Router from 'vue-router'

import Main from './views/Main.vue'

import Home from './views/main/Home.vue'
import About from './views/main/About.vue'
import Antiques from './views/main/Antiques.vue'
import Contact from './views/main/Contact.vue'
import Products from './views/main/Products.vue'
import Product from './views/main/Product.vue'

import Admin from './views/Admin.vue'
import Resume from './views/admin/Resume.vue'
import Slider from './views/admin/Slider.vue'
import Categories from './views/admin/Categories.vue'
import ProductsAdmin from './views/admin/ProductsAdmin.vue'
import AboutAdmin from './views/admin/AboutAdmin.vue'
import ContactAdmin from './views/admin/ContactAdmin.vue'
import Settings from './views/admin/Settings.vue'
import Users from './views/admin/Users.vue'

Vue.use(Router)

export default new Router ({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main,
            components: {
                public: Main,
            },
            children: [
                {
                    path: 'home',
                    name: 'main.home',
                    component: Home
                },
                {
                    path: 'about',
                    name: 'main.about',
                    component: About
                },
                {
                    path: 'antiques',
                    name: 'main.antiques',
                    component: Antiques
                },
                {
                    path: 'contact',
                    name: 'main.contact',
                    component: Contact
                },
                {
                    path: 'products',
                    name: 'main.products',
                    component: Products
                },
                {
                    path: 'product/:uid',
                    name: 'main.product',
                    component: Product
                },
            ],
        },
        {
            path: '/admin',
            name: 'admin',
            components: {
                admin: Admin,
            },
            children: [
                {
                    path: 'resume',
                    name: 'admin.resume',
                    component: Resume
                },
                {
                    path: 'slider',
                    name: 'admin.slider',
                    component: Slider
                },
                {
                    path: 'categories',
                    name: 'admin.categories',
                    component: Categories
                },
                {
                    path: 'products',
                    name: 'admin.products',
                    component: ProductsAdmin
                },
                {
                    path: 'about',
                    name: 'admin.about',
                    component: AboutAdmin
                },
                {
                    path: 'contact',
                    name: 'admin.contact',
                    component: ContactAdmin
                },
                {
                    path: 'settings',
                    name: 'admin.settings',
                    component: Settings
                },
                {
                    path: 'users',
                    name: 'admin.users',
                    component: Users
                },
            ]
        },
    ]
})
