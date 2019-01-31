<template>
    <div class="about">
        <section class="main-header main-header-blog" style="background-image:url(/img/galerias-victoria-tienda-de-antiguedades.jpg)">
            <header>
                <div class="container text-center">
                    <h2 class="h2 title">Nosotros</h2>
                    <p class="subtitle">Galerías Victoria</p>
                </div>
            </header>
        </section>

        <section class="history">
            <div class="container">
                <header>
                    <div class="row">
                        <div class="col-md-offset-2 col-md-8 text-center">
                            <h1 class="h2 title">Galerías Victoria</h1>
                            <div class="text">
                                <p>{{about.headline}}</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div class="row row-block">
                    <div class="col-md-5 history-image" :style="`background-image:url(${about.picture})`">
                        <div class="history-title">
                            <p>Desde</p>
                            <h2 class="title" style="margin-top: -8px;">1980</h2>
                        </div>
                    </div>
                    <div class="col-md-7 history-desc" v-html="about.story"></div>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
import { db } from '@/services/firebase'
export default {
    name: 'about',
    methods: {
        getAbout () {
            return db.collection ('settings').doc ('about').get().then (snapshot => {
                const about = snapshot.data();
                this.about = {
                    picture: about.picture,
                    headline: about.headline,
                    story: about.story.replace(/\n/gi, '<br>'),
                };
                return new Promise ((result, reject) => {
                    result (this.about);
                });
            });
        },
    },
    async mounted () {
        await this.getAbout ();
    },
    data () {
        return {
            about: {
                picture: '',
                headline: '',
                story: '',
            },
        }
    },
}
</script>
