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
        overview: String
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
    <div class="col-2 my-2">
        <div class="card border border-0 rounded-0 bg-black" >

            <!-- Copertina -->
            <img class="copertina" :src=" image != null ? `${store.pathImages}${image}` : `/img/netflix-logo.webp`" :alt="title">

            <!-- Card Body -->
            <!-- <div class="card-body d-none"> -->
            
                <!-- Titolo -->
                <!-- <h5>
                    <span class="opacity-100">Titolo: </span>
                    <span class="opacity-75">{{ title }}</span>                    
                </h5> -->

                <!-- Titolo originale -->
                <!-- <h6 v-if="title !== original_title">
                    <span class="opacity-100">Titolo originale: </span>
                    <span class="opacity-75">{{ original_title }}</span>  
                </h6> -->

                <!-- Lingua -->
                <!-- <div class="language">
                    <h6 class="m-0">Lingua:</h6> -->

                    <!-- flag -->
                    <!-- <div class="img">
                        <img :src='`https://flagsapi.com/${changeLang(language)}/flat/64.png`' :alt="language">
                    </div>
                </div> -->

                <!-- Voto -->
                <!-- <div class="d-flex align-items-center">
                    <h6 class="m-0 me-2 h-100">Voto:</h6>
                    <div>
                        <i v-for=" elem in 5" class="text-warning fa-star" :class=" elem <= voteStars(vote) ? `fa-solid` : `fa-regular` "></i>
                    </div>
                </div>     
                <p>{{ overview }}</p>           
            </div> -->
        </div>

        <!-- card content -->
        <div class="cardContent d-none">

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
                <div class="d-flex align-items-center">
                    <h6 class="m-0 me-2 h-100">Voto:</h6>
                    <div>
                        <i v-for=" elem in 5" class="text-warning fa-star" :class=" elem <= voteStars(vote) ? `fa-solid` : `fa-regular` "></i>
                    </div>
                </div>     

                <!-- Overview -->
                <p class="overview">{{ overview }}</p>           
            </div>
        </div>

        <!-- modal -->
        <div class="trailer d-none p-0">
            <div class="trailer-content">

            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;

.col-2 {
    // overflow-y: hidden;
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
    
        // card-body
        // .card-body { 
        //     position: absolute;
        //     color: #fff;
        //     background: #0000007a;
    
        //     h5 {
        //         font-size: 1rem;
        //     }
        //     h6 {
        //         font-size: 0.9rem;
        //     }
        //     p {
        //         font-size: 0.8rem;
        //     }
        
        //     // lingua
        //     .language {
        //         display: flex;
        //         align-items: center;
        //         margin-bottom: 0.5rem;
            
        //         // flag
        //         .img {
        //             width: 30px;
        //             margin-left: 0.3rem;
        //         }
        //     }
        // }
    
        // &:hover .card-body {
        //     display: block !important;
        // }
        // &:hover .copertina {
        //     display: none !important;
        // }
    }

    .trailer {
        @include center ('both');
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.2);

        .trailer-content {
            // max-width: 90%;
            // min-width: 500px;
            width: 400px;
            height: 300px;
            background-color: white;
        }
    }

    // &:hover .trailer{
    //     display: flex !important;
    // }

    .cardContent {
        position: absolute;
        // display: flex;
        align-items: flex-end;
        overflow: hidden;
        width: 300px;
        height: 400px;
        top: 0;
        left: 0;
        z-index: 999;
        
        .copertina {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            object-fit: cover;
        }

        .card-body {
            position: relative;
            padding: 1.5rem 1rem 0.5rem;
            color: #fff;
            background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.9) 5%);
            
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

            // overview
            .overview {
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

        }
    }

    &:hover .cardContent {
        display: flex !important;
    }
}
</style>