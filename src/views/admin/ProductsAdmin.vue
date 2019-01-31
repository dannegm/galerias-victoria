<template>
    <div class="product-show">
        <v-layout row pb-2>
            <v-flex xs8 offset-xs2>
                <v-card class="card--flex-toolbar floating">
                    <v-toolbar card prominent>
                        <v-toolbar-title class="body-2 grey--text">
                            Productos
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon
                            @click="newProductDialog()">
                            <v-icon>add</v-icon>
                        </v-btn>

                    </v-toolbar>
                    <v-divider class="no-margin"></v-divider>

                    <div class="card-content" style="min-height: 200px;">
                        <v-card v-if="newProduct.dialog">
                            <v-card-text>
                                <v-layout>
                                    <v-flex xs12 sm4>
                                        <Uploader folder="products" :onSuccess="onNewProductUploadSucces" />
                                    </v-flex>
                                    <v-flex xs12 sm8 ml-4>
                                        <v-text-field label="Nombre" box v-model="newProduct.name">
                                        </v-text-field>
                                        <v-textarea label="Descripción" box v-model="newProduct.description" auto-grow>
                                        </v-textarea>

                                        <v-layout>
                                            <v-flex xs12 sm6 mr-4>
                                                <v-text-field
                                                    label="Precio"
                                                    v-model="newProduct.price"
                                                    prefix="$"
                                                    box>
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>

                                        <v-layout>
                                            <v-flex xs6 mr-4>
                                                <v-select
                                                    label="Categoría"
                                                    :items="categories"
                                                    :return-object="true"
                                                    item-text="name"
                                                    v-model="newProduct.category"
                                                    box></v-select>
                                            </v-flex>
                                        </v-layout>

                                        <v-layout>
                                            <v-flex xs12 sm6 mr-4>
                                                <v-text-field
                                                    label="Marca"
                                                    v-model="newProduct.brand"
                                                    box>
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>

                                        <v-layout>
                                            <v-flex xs12 sm6 mr-4>
                                                <v-checkbox
                                                    :label="newProduct.available ? 'Disponible' : 'No disponible'"
                                                    v-model="newProduct.available">
                                                </v-checkbox>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>

                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    flat
                                    @click="newProduct.dialog = false">
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    :loading="newProduct.processing"
                                    :disabled="newProduct.processing"
                                    color="primary"
                                    @click="createProduct()">
                                    Añadir
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                        <v-card v-if="editProduct.dialog">
                            <v-card-text>
                                <v-layout>
                                    <v-flex xs12 sm4>
                                        <Uploader folder="products" :picture="editProduct.picture" :onSuccess="onEditProductUploadSucces" />
                                    </v-flex>
                                    <v-flex xs12 sm8 ml-4>
                                        <v-text-field label="Nombre" box v-model="editProduct.name">
                                        </v-text-field>
                                        <v-textarea label="Descripción" box v-model="editProduct.description" auto-grow>
                                        </v-textarea>

                                        <v-layout>
                                            <v-flex xs12 sm6 mr-4>
                                                <v-text-field
                                                    label="Precio"
                                                    v-model="editProduct.price"
                                                    prefix="$"
                                                    box>
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>

                                        <v-layout>
                                            <v-flex xs12 sm6 mr-4>
                                                <v-select
                                                    label="Categoría"
                                                    :items="categories"
                                                    :return-object="true"
                                                    item-text="name"
                                                    v-model="editProduct.category"
                                                    box></v-select>
                                            </v-flex>
                                        </v-layout>

                                        <v-layout>
                                            <v-flex xs12 sm6 mr-4>
                                                <v-text-field
                                                    label="Marca"
                                                    v-model="editProduct.brand"
                                                    box>
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>

                                        <v-layout>
                                            <v-flex xs12 sm6 mr-4>
                                                <v-checkbox
                                                    :label="editProduct.available ? 'Disponible' : 'No disponible'"
                                                    v-model="editProduct.available">
                                                </v-checkbox>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>

                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    flat
                                    @click="editProduct.dialog = false">
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    :loading="editProduct.processing"
                                    :disabled="editProduct.processing"
                                    color="primary"
                                    @click="updateProduct()">
                                    Actualizar
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                        <div class="products">
                            <v-layout v-if="!products.length">
                                <v-flex xs12 pa-3>
                                    <v-alert
                                        :value="!products.length"
                                        type="info">
                                        No hay products creados.
                                    </v-alert>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap pa-2>
                                <v-flex xs6 sm4 pa-2
                                    v-for="(product, index) in products"
                                    :key="index">
                                    <v-card>
                                        <v-img
                                            :src="product.picture"
                                            aspect-ratio="1.77">
                                        </v-img>

                                        <v-card-title primary-title>
                                            <div>
                                                <span class="grey--text mb-0">{{product.category.name}}</span><br />
                                                <span class="headline mb-0">{{product.name}}</span>
                                            </div>
                                        </v-card-title>

                                        <v-card-actions>
                                            <v-btn
                                                flat
                                                :loading="product.editing"
                                                :disabled="product.editing"
                                                @click="editProductDialog(product.uid);">
                                                <v-icon color="grey lighten-1" left>edit</v-icon>
                                                Editar
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                icon
                                                :loading="product.removing"
                                                :disabled="product.removing"
                                                @click="removeProduct(product.uid); product.removing = true;">
                                                <v-icon color="grey lighten-1">delete</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </div>

                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
import uuid from 'uuid/v1'
import { db } from '@/services/firebase'
import Uploader from '../../components/Uploader'

export default {
    components: {
        Uploader,
    },
    methods: {
        onNewProductUploadSucces (url) {
            this.newProduct.picture = url;
        },
        onEditProductUploadSucces (url) {
            this.editProduct.picture = url;
        },
        newProductDialog () {
            this.newProduct = {
                dialog: true,
                processing: false,
                picture: '',
                name: '',
                description: '',
                category: '',
                price: '',
                brand: '',
                available: false,
            };
        },
        async editProductDialog (uid) {
            this.editProduct = {
                dialog: false,
                processing: false,
                uid: '',
                picture: '',
                name: '',
                description: '',
                category: '',
                price: '',
                brand: '',
                available: false,
            };
            db.collection ('products').doc (uid).get ().then (snapshot => {
                const product = snapshot.data ();
                this.editProduct = {
                    ...product,
                    dialog: true,
                };
            })
        },

        getProducts () {
            return db.collection ('products').get ().then (productsSnapshot => {
                this.products = productsSnapshot.docs
                    .map (doc => doc.data())
                    .map(i => ({
                        ...i,
                        removing: false,
                        editing: false,
                    }));
                return new Promise ((result, reject) => {
                    result (this.products);
                });
            });
        },
        async removeProduct (uid) {
            await db.collection ('products').doc (uid).delete ();
            await this.getProducts ();
        },
        async createProduct () {
            this.newProduct.processing = true;
            const newProductData = {
                uid: uuid (),
                name: this.newProduct.name,
                description: this.newProduct.description,
                picture: this.newProduct.picture,
                category: this.newProduct.category,
                price: this.newProduct.price,
                brand: this.newProduct.brand,
                available: this.newProduct.available,
            };

            await db.collection ('products').doc (newProductData.uid).set (newProductData);
            await this.getProducts();

            this.newProduct = {
                dialog: false,
                processing: false,
                picture: '',
                name: '',
                description: '',
                category: '',
                price: '',
                brand: '',
                available: false,
            };
        },
        async updateProduct () {
            this.editProduct.processing = true;
            const editProductData = {
                uid: this.editProduct.uid,
                name: this.editProduct.name,
                description: this.editProduct.description,
                picture: this.editProduct.picture,
                category: this.editProduct.category,
                price: this.editProduct.price,
                brand: this.editProduct.brand,
                available: this.editProduct.available,
            };
            await db.collection ('products').doc (editProductData.uid).set (editProductData);
            await this.getProducts();

            this.editProduct = {
                dialog: false,
                processing: false,
                uid: '',
                picture: '',
                name: '',
                description: '',
                category: '',
                price: '',
                brand: '',
                available: false,
            };
        },

        getCategories () {
            return db.collection ('categories').get ().then (categoriesSnapshot => {
                this.categories = categoriesSnapshot.docs
                    .map (doc => doc.data())
                    .map(i => ({
                        ...i,
                        removing: false,
                        editing: false,
                    }));
                return new Promise ((result, reject) => {
                    result (this.categories);
                });
            });
        },
    },
    async mounted () {
        await this.getProducts ();
        await this.getCategories ();
    },
    data () {
        return {
            products: [],
            newProduct: {
                dialog: false,
                processing: false,
                picture: '',
                name: '',
                description: '',
                category: '',
                price: '',
                brand: '',
                available: false,
            },
            editProduct: {
                dialog: false,
                processing: false,
                uid: '',
                picture: '',
                name: '',
                description: '',
                category: '',
                price: '',
                brand: '',
                available: false,
            },
        }
    },
}
</script>
<style lang="less" scoped>
.v-card.floating {
    margin-top: -64px !important;
}
.v-divider.no-margin {
    margin: 0 !important;
}
</style>