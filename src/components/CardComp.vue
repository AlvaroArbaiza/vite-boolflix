<script>
import { store } from '../store.js';
export default {
    name: 'CardComp',
    // props: ['card', 'flag'],
    props: {
        title: String,
        original_title: String,
        language: String,
        flag: String,
        vote: Number,
        image: String
    },

    data() {
        return {
            store,
            arrayStars: [],
            arrayEmptyStars: []
        };
    },
    methods: {
        changeLang(lang) {

            if (lang == 'en') {

                return lang = 'US'
            } else if (lang == 'ja' ) {

                return lang = 'JP'
            } else if (lang == 'zh' || lang == 'zh') {

                return lang = 'CN'
            } else if (lang == 'he' ) {

                return lang = 'IL'
            } else if (lang == 'ko' ) {

                return lang = 'KR'
            } else if (lang == 'uk' ) {

                return lang = 'UA'
            } else if (lang == 'da' ) {

                return lang = 'DK'
            } else if (lang == 'cs' ) {

                return lang = 'CZ'
            } else if (lang == 'fa' ) {

                return lang = 'PK'
            } else if (lang == 'xx' ) {

                return lang = 'PT'
            } else if (lang == 'hi' ) {

                return lang = 'IN'
            } else if (lang == 'el' ) {

                return lang = 'GR'
            } else {
                
                return lang.toUpperCase()
            }
        },
        voteStars(vote) {
            return Math.ceil(vote / 2)
        }
    }
}
</script>

<template>
    <div class="col-2 my-2">
        <div class="card border border-0 rounded-0 bg-transparent" >

            <!-- Copertina -->
            <img :src=" image != null ? `${store.pathImages}${image}` : `/img/netflix-logo.webp`" :alt="title">

            <!-- Card Body -->
            <div class="card-body">
            
                <!-- Titolo -->
                <h5>{{ title }}</h5>

                <!-- Titolo originale -->
                <h6>{{ original_title }}</h6>

                <!-- Lingua -->
                <div class="language">
                    <h6 class="m-0">Lingua:</h6>

                    <!-- flag -->
                    <div class="img">

                        <img :src='`https://flagsapi.com/${changeLang(language)}/flat/64.png`' :alt="language">
                    </div>
                </div>

                <!-- Voto -->
                <div class="d-flex justify-content-center text-warning">
                    <div v-for=" elem in 5">
                        <i class="fa-star" :class=" elem <= voteStars(vote) ? `fa-solid` : `fa-regular` "></i>
                    </div>
                </div>                
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;

.card {
    height: 290px;
    flex-direction: row;

    img {
        object-fit: cover;
    }

    // card-body
    .card-body { 
        display: none !important;
    
        // lingua
        .language {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.5rem;
        
            // flag
            .img {
                width: 30px;
            }
        }
    }
}
</style>