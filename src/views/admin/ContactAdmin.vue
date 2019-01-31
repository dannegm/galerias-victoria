<template>
    <div class="slide-show">
        <v-layout row pb-2>
            <v-flex xs8 offset-xs2>
                <v-card class="card--flex-toolbar floating">
                    <v-toolbar card prominent>
                        <v-toolbar-title class="body-2 grey--text">
                            Contacto
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider class="no-margin"></v-divider>

                    <div class="card-content" style="min-height: 200px;">
                        <v-card>
                            <v-card-text>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 pr-2>
                                        <v-text-field label="Teléfono #1" box v-model="contact.phones.one" mask="(##) ####-####">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <v-text-field label="Teléfono #2" box v-model="contact.phones.two" mask="(##) ####-####">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>

                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    :loading="contact.processing"
                                    :disabled="contact.processing"
                                    color="primary"
                                    @click="saveContact()">
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </v-card>

                <v-card class="card--flex-toolbar below">
                    <v-toolbar card prominent>
                        <v-toolbar-title class="body-2 grey--text">
                            Social
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider class="no-margin"></v-divider>

                    <div class="card-content" style="min-height: 200px;">
                        <v-card>
                            <v-card-text>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field label="Facebook" box v-model="social.facebook" placeholder="https://facebook.com/">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 pr-2>
                                        <v-text-field label="Instagram" box v-model="social.instagram" prefix="@">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <v-text-field label="Whatsapp" box v-model="social.whatsapp" mask="(##) ####-####">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>

                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    :loading="social.processing"
                                    :disabled="social.processing"
                                    color="primary"
                                    @click="saveSocial()">
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </v-card>

                <v-card class="card--flex-toolbar below">
                    <v-toolbar card prominent>
                        <v-toolbar-title class="body-2 grey--text">
                            Ubicación
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-divider class="no-margin"></v-divider>

                    <div class="card-content" style="min-height: 200px;">
                        <v-card>
                            <v-card-text>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field label="Dirección" box v-model="location.address">
                                        </v-text-field>
                                    </v-flex>
                                    <hr />
                                    <v-flex xs12 sm6 pr-2>
                                        <v-text-field label="Latitud" box v-model="location.lat">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <v-text-field label="Longitud" box v-model="location.lng">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>

                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    :loading="location.processing"
                                    :disabled="location.processing"
                                    color="primary"
                                    @click="saveLocation()">
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

export default {
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

        async saveContact () {
            this.contact.processing = true;
            const contactData = {
                phones: this.contact.phones,
            };
            console.log(contactData)

            await db.collection ('settings').doc ('contact').set (contactData);
            await this.getContact();

            this.contact.processing = false;
        },
        async saveSocial () {
            this.social.processing = true;
            const socialData = {
                facebook: this.social.facebook,
                instagram: this.social.instagram,
                whatsapp: this.social.whatsapp,
            };

            await db.collection ('settings').doc ('social').set (socialData);
            await this.getSocial();

            this.social.processing = false;
        },
        async saveLocation () {
            this.location.processing = true;
            const locationData = {
                address: this.location.address,
                lat: this.location.lat,
                lng: this.location.lng,
            };

            await db.collection ('settings').doc ('location').set (locationData);
            await this.getLocation();

            this.location.processing = false;
        },
    },
    async mounted () {
        await this.getContact ();
        await this.getSocial ();
        await this.getLocation ();
    },
    data () {
        return {
            contact: {
                processing: false,
                phones: {
                    one: '',
                    two: '',
                }
            },
            social: {
                processing: false,
                facebook: '',
                instagram: '',
                whatsapp: '',
            },
            location: {
                processing: false,
                address: '',
                lat: '',
                lng: '',
            }
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