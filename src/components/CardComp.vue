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
            } else {
                
                return lang.toUpperCase()
            }
        },
        voteStars(vote) {

            
            let num = Math.floor(vote);
            
            let numStars = Math.ceil( num / 2)

            let numStarsEmpty = 5 - numStars
            
            for (let i = 0; i < numStars; i++) {
                this.arrayStars.push("fa-solid fa-star");
            }
            for (let i = 0; i < numStarsEmpty; i++) {
                this.arrayEmptyStars.push("fa-regular fa-star");
            }
            console.log(this.arrayStars)

            return numStars;
        }
    }
}
</script>

<template>
    <div class="col-2">
        <div class="card" >
            <div class="card-body">
                <img :src=" image != null ? `${store.pathImages}${image}` : `/img/netflix-logo.webp`" :alt="title">

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
                <h6>Voto: {{ voteStars(vote) }}</h6>
                <div class="d-flex justify-content-center text-warning">
                    <div v-for="( elem, index ) in this.arrayStars">
                        <i :class="elem"></i>
                    </div>
                    <div v-for="( elem, index ) in this.arrayEmptyStars">
                        <i :class="elem"></i>
                    </div>
                </div>
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