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
        image: String,
        overview: String,
        ind: Number,
        indTrailer: String
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
    <div @click="$emit('trailer')" class="col-2 my-2">
        <div class="card border border-0 rounded-0 bg-black" >

            <!-- Copertina -->
            <img class="copertina" :src=" image != null ? `${store.pathImages}${image}` : `/img/netflix-logo.webp`" :alt="title">

        </div>

        <!-- card Hover -->
        <div class="card cardHover d-none">

            <img class="copertina" :src=" image != null ? `${store.pathImages}${image}` : `/img/netflix-logo.webp`" :alt="title">

            <!-- Card Body -->
            <div class="card-body">                
            
                <!-- Titolo -->
                <h5>
                    <span class="opacity-100">Titolo: </span>
                    <span class="opacity-75">{{ title }}</span>                    
                </h5>

                <!-- Titolo originale -->
                <h6 v-if="title !== original_title">
                    <span class="opacity-100">Titolo originale: </span>
                    <span class="opacity-75">{{ original_title }}</span>  
                </h6>

                <!-- Lingua -->
                <div class="language">
                    <h6 class="m-0">Lingua:</h6>

                    <!-- flag -->
                    <div class="img">
                        <img :src='`https://flagsapi.com/${changeLang(language)}/flat/64.png`' :alt="language">
                    </div>
                </div>

                <!-- Voto -->
                <div class="d-flex align-items-center mb-1">
                    <h6 class="m-0 me-2 h-100">Voto:</h6>
                    <div>
                        <i v-for=" elem in 5" class="text-warning fa-star" :class=" elem <= voteStars(vote) ? `fa-solid` : `fa-regular` "></i>
                    </div>
                </div>     

                <!-- Overview -->
                <p class="overview">{{ overview }}</p>           
            </div>
        </div>

        <!------------------------- modal ----------------------------->

        <!-- condizioni per la quale trailer comparirà, se gli indici sono uguali ( che siano maggiori o uguali a 0 ) -->
        <div v-if="indTrailer / ind === 1 || indTrailer + ind === 0" class="trailer p-0">

            <!-- trailer-content -->
            <div class="trailer-content">

                <!--------------- iframe -------------------->

                <!-- Se il trailer c'è -->
                <iframe v-if="store.arrayTrailers.length" class="cinematics" :src="`https://www.youtube.com/embed/${store.arrayTrailers[store.tlrIndexKey].key}?start=1&autoplay=1&controls=0`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                <!-- Se il trailer o nessun altro video c'è -->
                <div v-else class="cinematics novideo">

                </div>

                <!--------------- Card Body ------------------>
                <div class="card-body">                
                
                    <!-- Titolo -->
                    <h5>
                        <span class="opacity-100">Titolo: </span>
                        <span class="opacity-75">{{ title }}</span>                    
                    </h5>

                    <!-- Titolo originale -->
                    <h6 v-if="title !== original_title">
                        <span class="opacity-100">Titolo originale: </span>
                        <span class="opacity-75">{{ original_title }}</span>  
                    </h6>

                    <!-- Lingua -->
                    <div class="language">
                        <h6 class="m-0">Lingua:</h6>

                        <!-- flag -->
                        <div class="img">
                            <img :src='`https://flagsapi.com/${changeLang(language)}/flat/64.png`' :alt="language">
                        </div>
                    </div>

                    <!-- Vote -->
                    <div class="d-flex align-items-center mb-1">
                        <h6 class="m-0 me-2 h-100">Voto:</h6>
                        <div>
                            <i v-for=" elem in 5" class="text-warning fa-star" :class=" elem <= voteStars(vote) ? `fa-solid` : `fa-regular` "></i>
                        </div>
                    </div>     

                    <!-- Overview -->
                    <p class="overview">{{ overview }}</p>           
                </div>                

                <!-- Button exit -->
                <div class="exit" @click="$emit('closeModal')">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;

.col-2 {
    position: relative;
    // card
    .card {
        position: relative;
        height: 290px;
        flex-direction: row;
        filter: drop-shadow(2px 4px 6px black);
    
        img {
            object-fit: cover;
        }        
    }

    // cardbody
    .card-body {
        position: relative;
        padding: 1.5rem 1rem 0.5rem;
        color: #fff;
        
        h5 {
            font-size: 1rem;
        }
        h6 {
            font-size: 0.9rem;
        }
        p {
            font-size: 0.8rem;
        }
    
        // lingua
        .language {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
        
            // flag
            .img {
                width: 30px;
                margin-left: 0.3rem;
            }
        }
    }

    // card on hover
    .cardHover {
        position: absolute;
        align-items: flex-end;
        overflow: hidden;
        width: 300px;
        height: 400px;
        top: 0;
        left: 0;
        z-index: 999;
        border-width: 2px;
        cursor: pointer;
        
        // copertina
        .copertina {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            object-fit: cover;
        }

        // cardbody
        .card-body {
            background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.9) 5%);

            // overview
            .overview {
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }

    &:hover .cardHover {
        display: flex !important;
    }

    // trailer
    .trailer {
        @include center ('both');
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.2);

        // trailer-content
        .trailer-content {
            display: flex;
            align-items: flex-end;
            max-width: 90%;
            min-width: 500px;
            max-height: 100%;
            min-height: 500px;
            aspect-ratio: 2/1;
            position: relative;

            .cinematics {
                position: absolute;
                height: 100%;
                width: 100%;
                aspect-ratio: 2/1;
            }

            .novideo {
                background: #141414;
                border-radius: 1rem;
                box-shadow: 0 0px 6px 5px #141414e0;
            }

            // card-body
            .card-body {
                background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6) 20%);
            }

            .exit {
                position: absolute;
                top: 0.2rem;
                right: 0.2rem;
                width: 4rem;
                height: 4rem;
                text-align: center;
                font-size: 3rem;
                line-height: 4rem;
                border-radius: 1rem;
                color: #ffffff87;
                background-color: #000000;
                z-index: 999999;

                &:hover {
                    color: #ffffff;
                }
            }
        }
    }
}
</style>