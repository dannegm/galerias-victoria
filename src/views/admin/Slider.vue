<template>
    <div class="slide-show">
        <v-layout row pb-2>
            <v-flex xs8 offset-xs2>
                <v-card class="card--flex-toolbar floating">
                    <v-toolbar card prominent>
                        <v-toolbar-title class="body-2 grey--text">
                            Slide Show
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon
                            @click="newSlideDialog()">
                            <v-icon>add</v-icon>
                        </v-btn>

                    </v-toolbar>
                    <v-divider class="no-margin"></v-divider>

                    <div class="card-content" style="min-height: 200px;">
                        <v-card v-if="newSlide.dialog">
                            <v-card-text>
                                <v-layout>
                                    <v-flex xs12 sm4>
                                        <Uploader folder="slides" :onSuccess="onNewSlideUploadSucces" />
                                    </v-flex>
                                    <v-flex xs12 sm8 ml-4>
                                        <v-text-field label="Título" box v-model="newSlide.title">
                                        </v-text-field>
                                        <v-text-field label="Subtítulo" box v-model="newSlide.subtitle">
                                        </v-text-field>

                                        <v-layout>
                                            <v-flex xs6 mr-4>
                                                <v-text-field label="Texto" box v-model="newSlide.action.text">
                                                </v-text-field>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-text-field label="URL" box v-model="newSlide.action.href">
                                                </v-text-field>
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
                                    @click="newSlide.dialog = false">
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    :loading="newSlide.processing"
                                    :disabled="newSlide.processing"
                                    color="primary"
                                    @click="createSlide()">
                                    Añadir
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                        <v-card v-if="editSlide.dialog">
                            <v-card-text>
                                <v-layout>
                                    <v-flex xs12 sm4>
                                        <Uploader folder="slides" :picture="editSlide.background" :onSuccess="onEditSlideUploadSucces" />
                                    </v-flex>
                                    <v-flex xs12 sm8 ml-4>
                                        <v-text-field label="Título" box v-model="editSlide.title">
                                        </v-text-field>
                                        <v-text-field label="Subtítulo" box v-model="editSlide.subtitle">
                                        </v-text-field>

                                        <v-layout>
                                            <v-flex xs6 mr-4>
                                                <v-text-field label="Texto" box v-model="editSlide.action.text">
                                                </v-text-field>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-text-field label="URL" box v-model="editSlide.action.href">
                                                </v-text-field>
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
                                    @click="editSlide.dialog = false">
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    :loading="editSlide.processing"
                                    :disabled="editSlide.processing"
                                    color="primary"
                                    @click="updateSlide()">
                                    Actualizar
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                        <div class="slides">
                            <v-layout v-if="!slides.length">
                                <v-flex xs12 pa-3>
                                    <v-alert
                                        :value="!slides.length"
                                        type="info">
                                        No hay slides creados.
                                    </v-alert>
                                </v-flex>
                            </v-layout>

                            <v-layout wrap pa-2>
                                <v-flex xs6 sm4 pa-2
                                    v-for="(slide, index) in slides"
                                    :key="index">
                                    <v-card>
                                        <v-img
                                            :src="slide.background"
                                            aspect-ratio="1.77"></v-img>

                                        <v-card-title primary-title>
                                            <div>
                                                <h3 class="headline mb-0">{{slide.title}}</h3>
                                                <p>{{slide.subtitle}}</p>
                                            </div>
                                        </v-card-title>

                                        <v-card-actions>
                                            <v-btn
                                                flat
                                                :loading="slide.editing"
                                                :disabled="slide.editing"
                                                @click="editSlideDialog(slide.uid);">
                                                <v-icon color="grey lighten-1" left>edit</v-icon>
                                                Editar
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                icon
                                                :loading="slide.removing"
                                                :disabled="slide.removing"
                                                @click="removeSlide(slide.uid); slide.removing = true;">
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
        onNewSlideUploadSucces (url) {
            this.newSlide.background = url;
        },
        onEditSlideUploadSucces (url) {
            this.editSlide.background = url;
        },
        newSlideDialog () {
            this.newSlide = {
                dialog: true,
                processing: false,
                background: '',
                title: '',
                subtitle: '',
                action: {
                    text: '',
                    href: '',
                },
            };
        },
        async editSlideDialog (uid) {
            this.editSlide = {
                dialog: false,
                processing: false,
                background: '',
                title: '',
                subtitle: '',
                action: {
                    text: '',
                    href: '',
                },
            };
            db.collection ('slideshow').doc (uid).get ().then (snapshot => {
                const slide = snapshot.data ();
                this.editSlide = {
                    ...slide,
                    dialog: true,
                };
            })
        },

        getSlides () {
            return db.collection ('slideshow').get ().then (slidesSnapshot => {
                this.slides = slidesSnapshot.docs
                    .map (doc => doc.data())
                    .map(i => ({
                        ...i,
                        removing: false,
                        editing: false,
                    }));
                return new Promise ((result, reject) => {
                    result (this.slides);
                });
            });
        },
        async removeSlide (uid) {
            await db.collection ('slideshow').doc (uid).delete ();
            await this.getSlides ();
        },
        async createSlide () {
            this.newSlide.processing = true;
            const newSlideData = {
                uid: uuid (),
                title: this.newSlide.title,
                subtitle: this.newSlide.subtitle,
                background: this.newSlide.background,
                action: {
                    text: this.newSlide.action.text,
                    href: this.newSlide.action.href,
                },
            };

            await db.collection ('slideshow').doc (newSlideData.uid).set (newSlideData);
            await this.getSlides();

            this.newSlide = {
                dialog: false,
                processing: false,
                background: '',
                title: '',
                subtitle: '',
                action: {
                    text: '',
                    href: '',
                },
            };
        },
        async updateSlide () {
            this.editSlide.processing = true;
            const editSlideData = {
                uid: this.editSlide.uid,
                title: this.editSlide.title,
                subtitle: this.editSlide.subtitle,
                background: this.editSlide.background,
                action: {
                    text: this.editSlide.action.text,
                    href: this.editSlide.action.href,
                },
            };
            await db.collection ('slideshow').doc (editSlideData.uid).set (editSlideData);
            await this.getSlides();

            this.editSlide = {
                dialog: false,
                processing: false,
                background: '',
                title: '',
                subtitle: '',
                action: {
                    text: '',
                    href: '',
                },
            };
        },
    },
    async mounted () {
        await this.getSlides ();
    },
    data () {
        return {
            slides: [],
            newSlide: {
                dialog: false,
                processing: false,
                background: '',
                title: '',
                subtitle: '',
                action: {
                    text: '',
                    href: '',
                },
            },
            editSlide: {
                dialog: false,
                processing: false,
                uid: '',
                background: '',
                title: '',
                subtitle: '',
                action: {
                    text: '',
                    href: '',
                }
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