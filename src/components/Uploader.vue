<template>
    <div
        class="uploader"
        :class="{ 'has-preview': pictureUrl }">
        <div class="uploader-preview"
            v-if="pictureUrl"
            :style="`background-image: url(${pictureUrl})`">
        </div>
        <div class="uploader-controls">
            <input
                type="file"
                class="hidden"
                ref="filePicker"
                @change="fileChange($event.target)" />

            <p>Selecciona una imagen de tu computadora</p>
            <v-btn
                :loading="uploading"
                :disabled="uploading"
                color="blue-grey"
                class="white--text"
                @click="$refs.filePicker.click()">
                <v-icon left dark>search</v-icon>
                Explorar
            </v-btn>
        </div>
        <v-progress-linear v-if="progress" v-model="progress"></v-progress-linear>
    </div>
</template>

<script>
import { storage } from '@/services/firebase'
export default {
    name: 'Uploader',
    props: [
        'folder',
        'picture',
        'onSuccess',
        'onError',
    ],
    methods: {
        fileChange ({ files }) {
            this.uploading = true;
            this.handleUpload (files [0])
        },
        handleUpload (file) {
            this.progress = 0;
            this.pictureRef = this.$storage.child (`${this.folder}/${file.name}`);
            this.uploaderTask = this.pictureRef.put(file);

            this.uploaderTask.on ('state_changed', (snapshot) => {
                this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, this.handleError, this.handleSuccess);

        },
        handleSuccess (snapshot) {
            this.pictureRef.getDownloadURL().then (url => {
                this.uploading = false;
                this.pictureUrl = url;
                this.onSuccess (url);
            });
        },
        handleError (error) {
            this.onError (error);
        }

    },
    mounted () {
        this.pictureUrl = this.picture ? this.picture : null;
        this.$storage = storage.ref();
    },
    data () {
        return {
            $storage: null,
            uploaderTask: null,
            progress: 0,
            uploading: false,
            pictureRef: null,
            pictureUrl: null,
        }
    }
}
</script>

<style lang="less" scoped>
.hidden {
    display: none;
}
.v-progress-linear {
    margin: 0;
}
.uploader {
    width: auto;
    overflow: hidden;
    display: block;
    position: relative;
    border: 1px solid #dadada;
    background-color: #fafafa;

    .uploader-preview {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        background-size: cover;
        background-position: center;
    }

    .uploader-controls {
        display: flex;
        min-height: 160px;
        position: relative;
        overflow: hidden;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        p {
            font-size: 14px;
            width: 80%;
            text-align: center;
            margin: 8px;
        }
    }

    &.has-preview {
        .uploader-controls {
            background-color: rgba(0,0,0,.5);
            p {
                color: #fff;
            }
        }
    }
}
</style>