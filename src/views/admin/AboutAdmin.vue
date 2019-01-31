<template>
    <div class="slide-show">
        <v-layout row pb-2>
            <v-flex xs8 offset-xs2>
                <v-card class="card--flex-toolbar floating">
                    <v-toolbar card prominent>
                        <v-toolbar-title class="body-2 grey--text">
                            Nosotros
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider class="no-margin"></v-divider>

                    <div class="card-content" style="min-height: 200px;">
                        <v-card>
                            <v-card-text>
                                <v-layout>
                                    <v-flex xs12 sm4>
                                        <img :src="about.picture" style="width: 100%" />
                                        <br />
                                        <br />
                                        <Uploader folder="about" :picture="about.picture" :onSuccess="onPictureUploadSucces" />
                                    </v-flex>
                                    <v-flex xs12 sm8 ml-4>
                                        <v-text-field label="Encabezado" box v-model="about.headline">
                                        </v-text-field>

                                        <v-textarea label="Historia" box v-model="about.story" auto-grow>
                                        </v-textarea>

                                    </v-flex>
                                </v-layout>
                            </v-card-text>

                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    :loading="about.processing"
                                    :disabled="about.processing"
                                    color="primary"
                                    @click="saveAbout()">
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
import { db } from '@/services/firebase'
import Uploader from '../../components/Uploader'

export default {
    components: {
        Uploader,
    },
    methods: {
        onPictureUploadSucces (url) {
            this.about.picture = url;
        },

        getAbout () {
            return db.collection ('settings').doc ('about').get().then (snapshot => {
                const about = snapshot.data();
                this.about = {
                    ...this.about,
                    picture: about.picture,
                    headline: about.headline,
                    story: about.story,
                };
                return new Promise ((result, reject) => {
                    result (this.about);
                });
            });
        },

        async saveAbout () {
            this.about.processing = true;
            const aboutData = {
                picture: this.about.picture,
                headline: this.about.headline,
                story: this.about.story,
            };

            await db.collection ('settings').doc ('about').set (aboutData);
            await this.getAbout();

            this.about.processing = false;
        },
    },
    async mounted () {
        await this.getAbout ();
    },
    data () {
        return {
            about: {
                processing: false,
                picture: '',
                headline: '',
                story: '',
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