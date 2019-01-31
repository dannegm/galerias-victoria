<template>
    <div class="categories">
        <v-layout row pb-2>
            <v-flex xs8 offset-xs2>
                <v-card class="card--flex-toolbar floating">
                    <v-toolbar card prominent>
                        <v-toolbar-title class="body-2 grey--text">
                            Categorías
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon
                            @click="newCategoryDialog()">
                            <v-icon>add</v-icon>
                        </v-btn>

                    </v-toolbar>
                    <v-divider class="no-margin"></v-divider>

                    <div class="card-content" style="min-height: 200px;">
                        <v-card v-if="newCategory.dialog">
                            <v-card-text>
                                <v-layout>
                                    <v-flex xs12 sm4>
                                        <Uploader folder="categories" :onSuccess="onNewCategoryUploadSucces" />
                                    </v-flex>
                                    <v-flex xs12 sm8 ml-4>
                                        <v-text-field label="Título" box v-model="newCategory.name">
                                        </v-text-field>
                                        <v-select
                                            label="Clase del icono"
                                            :items="icons"
                                            v-model="newCategory.icon"
                                            box>
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>

                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    flat
                                    @click="newCategory.dialog = false">
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    :loading="newCategory.processing"
                                    :disabled="newCategory.processing"
                                    color="primary"
                                    @click="createCategory()">
                                    Añadir
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                        <v-card v-if="editCategory.dialog">
                            <v-card-text>
                                <v-layout>
                                    <v-flex xs12 sm4>
                                        <Uploader folder="categories" :picture="editCategory.background" :onSuccess="onEditCategoryUploadSucces" />
                                    </v-flex>
                                    <v-flex xs12 sm8 ml-4>
                                        <v-text-field label="Título" box v-model="editCategory.name">
                                        </v-text-field>
                                        <v-select
                                            label="Clase del icono"
                                            :items="icons"
                                            v-model="editCategory.icon"
                                            box>
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>

                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    flat
                                    @click="editCategory.dialog = false">
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    :loading="editCategory.processing"
                                    :disabled="editCategory.processing"
                                    color="primary"
                                    @click="updateCategory()">
                                    Actualizar
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                        <div class="categories">
                            <v-layout v-if="!categories.length">
                                <v-flex xs12 pa-3>
                                    <v-alert
                                        :value="!categories.length"
                                        type="info">
                                        No hay categorías creadas.
                                    </v-alert>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap pa-2>
                                <v-flex xs4 sm3 pa-2
                                    v-for="(category, index) in categories"
                                    :key="index">
                                    <v-card>
                                        <v-img
                                            :src="category.background"
                                            aspect-ratio="1.77"></v-img>

                                        <v-card-title primary-title>
                                            <div>
                                                <h3 class="headline mb-0">{{category.name}}</h3>
                                            </div>
                                        </v-card-title>

                                        <v-card-actions>
                                            <v-btn
                                                flat
                                                :loading="category.editing"
                                                :disabled="category.editing"
                                                @click="editCategoryDialog(category.uid);">
                                                <v-icon color="grey lighten-1" left>edit</v-icon>
                                                Editar
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                icon
                                                :loading="category.removing"
                                                :disabled="category.removing"
                                                @click="removeCategory(category.uid); category.removing = true;">
                                                <v-icon color="grey lighten-1">delete</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </div>

                    </div>
                </v-card>

                <v-card class="card--flex-toolbar below">
                    <v-toolbar card prominent>
                        <v-toolbar-title class="body-2 grey--text">
                            Stretcher
                        </v-toolbar-title>
                        <v-spacer></v-spacer>

                    </v-toolbar>
                    <v-divider class="no-margin"></v-divider>

                    <div class="card-content" style="min-height: 200px;">
                        <v-layout wrap pa-2>
                            <v-flex xs12 pa-2>
                                <p>Selecciona las categorías que se mostrarán en la página de inicio</p>
                            </v-flex>
                            <v-flex xs6 sm3 pa-2
                                v-for="(slot, index) in slots"
                                :key="index">
                                <v-select
                                    :items="categories"
                                    :label="`Slot #${index + 1}`"
                                    :return-object="true"
                                    item-text="name"
                                    v-model="slots[index]"
                                    solo></v-select>
                            </v-flex>
                        </v-layout>

                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                :loading="slotsSaving"
                                :disabled="slotsSaving"
                                color="primary"
                                @click="updateStretcher()">
                                Guardar
                            </v-btn>
                            <v-btn
                                v-if="canCreateSlots"
                                :loading="slotsSaving"
                                :disabled="slotsSaving"
                                color="primary"
                                @click="createStretcher()">
                                Create
                            </v-btn>
                        </v-card-actions>
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
        onNewCategoryUploadSucces (url) {
            this.newCategory.background = url;
        },
        onEditCategoryUploadSucces (url) {
            this.editCategory.background = url;
        },
        newCategoryDialog () {
            this.newCategory = {
                dialog: true,
                processing: false,
                background: '',
                name: '',
                icon: '',
            };
        },
        async editCategoryDialog (uid) {
            this.editCategory = {
                dialog: false,
                processing: false,
                background: '',
                name: '',
                icon: '',
            };
            db.collection ('categories').doc (uid).get ().then (snapshot => {
                const Category = snapshot.data ();
                this.editCategory = {
                    ...Category,
                    dialog: true,
                };
            })
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
        async removeCategory (uid) {
            await db.collection ('categories').doc (uid).delete ();
            await this.getCategories ();
        },
        async createCategory () {
            this.newCategory.processing = true;
            const newCategoryData = {
                uid: uuid (),
                name: this.newCategory.name,
                background: this.newCategory.background,
                icon: this.newCategory.icon,
            };

            await db.collection ('categories').doc (newCategoryData.uid).set (newCategoryData);
            await this.getCategories();

            this.newCategory = {
                dialog: false,
                processing: false,
                background: '',
                name: '',
                icon: '',
            };
        },
        async updateCategory () {
            this.editCategory.processing = true;
            const editCategoryData = {
                uid: this.editCategory.uid,
                name: this.editCategory.name,
                background: this.editCategory.background,
                icon: this.editCategory.icon,
            };
            await db.collection ('categories').doc (editCategoryData.uid).set (editCategoryData);
            await this.getCategories();

            this.editCategory = {
                dialog: false,
                processing: false,
                background: '',
                name: '',
                icon: '',
            };
        },

        getSlots () {
            return db.collection ('stretcher').get ().then (slotsSnapshot => {
                this.slots = slotsSnapshot.docs
                    .map (doc => doc.data())
                    .sort((a, b) => a.order - b.order);
                return new Promise ((result, reject) => {
                    result (this.slots);
                });
            });
        },
        async createStretcher () {
            this.slotsSaving = true;
            this.categories.slice (4).forEach (async (cat) => {
                await db.collection ('stretcher').doc (cat.uid).set (cat);
                await this.getSlots ();
                this.slotsSaving = false;
            });
        },
        async updateStretcher () {
            this.slotsSaving = true;
            const cacheSlots = { ...this.slots };

            await Promise.all (this.categories.map(async (cat) => {
                return await db.collection ('stretcher').doc (cat.uid).delete ();
            }));

            let order = 0;
            await Promise.all (Object.values(cacheSlots).map(async (cat, index) => {
                const category = {
                    uid: cat.uid,
                    name: cat.name,
                    background: cat.background,
                    icon: cat.icon,
                    order: index,
                };
                return await db.collection ('stretcher').doc (cat.uid).set (category);
            }));

            await this.getSlots ();
            this.slotsSaving = false;
        }
    },
    async mounted () {
        await this.getCategories ();
        await this.getSlots ();
    },
    data () {
        return {
            categories: [],
            canCreateSlots: false,
            slots: [],
            slotsSaving: false,

            newCategory: {
                dialog: false,
                processing: false,
                background: '',
                name: '',
                icon: '',
            },
            editCategory: {
                dialog: false,
                processing: false,
                uid: '',
                background: '',
                name: '',
                icon: '',
            },
            icons: [
                'fornitures',
                'escultures',
                'landscapes',
                'sacro-art',
                'porcelain',
                'silver',
                'decor',
                'marfil',
            ],
        }
    },
}
</script>
<style lang="less" scoped>
.v-card.floating {
    margin-top: -64px !important;
}
.v-card.below {
    margin-top: 2rem !important;
}
.v-divider.no-margin {
    margin: 0 !important;
}
</style>