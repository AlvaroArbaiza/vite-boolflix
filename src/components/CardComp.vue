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
            store
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
            } else {
                
                return lang.toUpperCase()
            }
        }
    }
}
</script>

<template>
    <div class="col-2">
        <div class="card" >
            <div class="card-body">
                <img :src="`${store.pathImages}${image}`" :alt="title">

                <!-- Titolo -->
                <h5>{{ title }}</h5>

                <!-- Titolo originale -->
                <h6>{{ original_title }}</h6>
                <!-- <h6>Lingua: {{ card.original_language }}</h6> -->
                <div class="language">
                    <h6 class="m-0">Lingua:</h6>
                    <div class="img">

                        <img :src='`https://flagsapi.com/${changeLang(language)}/flat/64.png`' :alt="language">
                    </div>
                </div>
                <h6>Voto: {{ vote }}</h6>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;

.language {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;

    .img {
        width: 30px;

        img {
    
            max-width: 100%;
        }
    }
    }
</style>