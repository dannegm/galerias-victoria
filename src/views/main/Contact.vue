<template>
    <div class="contact">
        <section class="main-header" style="background-image:url(/img/galerias-victoria-tienda-de-antiguedades.jpg)">
            <header>
                <div class="container text-center">
                    <h2 class="h2 title">Contacto</h2>
                </div>
            </header>
        </section>

        <section class="contact">
            <div id="map">
                <GmapMap
                    :center="mapLocation"
                    :zoom="14"
                    :options="{styles:mapStyle}"
                    style="width: 100%; height: 100%;">
                    <GmapMarker :position="location" />
                </GmapMap>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1">
                        <div class="contact-block">
                            <div class="contact-info">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <figure class="text-center">
                                            <span class="icon icon-map-marker"></span>
                                            <figcaption>
                                                <strong>Dirección</strong>
                                                <span v-html="location.address"></span>
                                            </figcaption>
                                        </figure>
                                    </div>
                                    <div class="col-sm-4">
                                        <figure class="text-center">
                                            <span class="icon icon-phone"></span>
                                            <figcaption>
                                                <strong>Teléfono</strong>
                                                <span>
                                                    {{contact.phones.one | phone}} <br />
                                                    {{contact.phones.two | phone}}
                                                </span>
                                            </figcaption>
                                        </figure>
                                    </div>
                                    <div class="col-sm-4">
                                        <figure class="text-center">
                                            <span class="icon icon-clock"></span>
                                            <figcaption>
                                                <strong>Horarios</strong>
                                                <span>
                                                    Lunes a Domingo de <br />
                                                    10:00 A.M. a 7:00 P.M.
                                                </span>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                            </div>

                            <div class="banner">
                                <div class="row">
                                    <div class="col-md-offset-1 col-md-10 text-center">
                                        <p>
                                            Estamos para ayudarle, sientase libre de contactarnos y le resolveremos las dudas que pueda tener, dejenos a su disposición el medio que considere más cómodo.
                                        </p>

                                        <div class="contact-form-wrapper">
                                            <div class="contact-form clearfix">
                                                <form>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <input id="Name" name="Name" type="text" value="" class="form-control" placeholder="Nombre" >
                                                            </div>
                                                        </div>

                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <input id="Tel" name="Tel" type="tel" value="" class="form-control" placeholder="Teléfono" >
                                                            </div>
                                                        </div>

                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <input id="Email" name="Email" type="email" value="" class="form-control" placeholder="Email" >
                                                            </div>
                                                        </div>

                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <textarea id="Comment" name="Comment" class="form-control" placeholder="Mensaje" rows="10"></textarea>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-12 text-center">
                                                            <input type="submit" class="btn btn-clean" value="Enviar" />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
import Vue from 'vue'
import { db } from '@/services/firebase'

import * as VueGoogleMaps from 'vue2-google-maps'
import { mobel } from '@/utils/mapStyles'

Vue.use (VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLEMAPS_API_KEY,
  },
})

export default {
    name: 'contact',
    components: {
        VueGoogleMaps,
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
        await this.getLocation ();
    },
    data () {
        return {
            mapStyle: mobel,
            contact: {
                phones: {
                    one: '',
                    two: '',
                }
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

<style scoped>
.contact .contact-block .contact-form {
    display: block;
}
</style>
