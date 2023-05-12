<script>
import { store } from '../store.js';
import axios from 'axios';
import CardComp from './CardComp.vue';

export default {
    name: 'MainComp',
    components: {
        CardComp
    },
    data() {
        return {
            store
        };
    },
    created() {
        this.topRated()
    },
    methods: {
        topRated() {
            
            // ricerca per film
            axios.get(`${store.pathTopRated}${store.apiKey}${store.pageTopRated}`)
                .then(response => {

                    store.arrayResultsTopRated = response.data.results              
                })
        },
        noResults() {
            if (store.noResults == true && store.noResultsSeries == true) {
                store.bol = false
                return true
            } else {

                store.bol = true
                return false
            }
        }
    }
}
</script>

<template>
    <!-- no results found -->
    <div id="noResults" class="d-flex justify-content-center bg-white position-relative" v-if="this.noResults()">
        <!-- text -->
        <div id="noReText" class="position-absolute">
            <span class="text-uppercase text-black">no results found</span>
        </div>
        
        <iframe width="1120" height="630" src="https://www.youtube.com/embed/2apVwq-pX9E?start=4&autoplay=1&controls=0&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>

    <div class="container">

        <!-- Top Rated -->
        <div class="row flex-wrap m-0" v-if="store.bol">
            <h2 class="text-white mt-4">Top Rated</h2>
            <CardComp v-for="(elem, index) in store.arrayResultsTopRated" :key="index" 

                :title= "elem.title"
                :original_title= "elem.original_title"
                :language= "elem.original_language"
                :vote= "elem.vote_average"
                :image="elem.poster_path"
                :overview="elem.overview">
            </CardComp>
        </div>
            
        <!-- movies -->
        <div class="row flex-wrap m-0" v-if="store.arrayResults.length">
            <h2 class="text-white mt-4">Movies</h2>
            <CardComp v-for="(elem, index) in store.arrayResults" :key="index" 

                :title= "elem.title"
                :original_title= "elem.original_title"
                :language= "elem.original_language"
                :vote= "elem.vote_average"
                :image="elem.poster_path"
                :overview="elem.overview">
            </CardComp>
        </div>

        <!-- series -->
        <div class="row flex-wrap m-0" v-if="store.arrayResultsSeries.length">

            <h2 class="text-white mt-4">Series</h2>
            <CardComp v-for="(elem, index) in store.arrayResultsSeries" :key="index" 

                :title= "elem.name"
                :original_title= "elem.original_name"
                :language= "elem.original_language"
                :vote= "elem.vote_average"
                :image="elem.poster_path"
                :overview="elem.overview">
            </CardComp>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;

#noResults {
    width: 100%;

    // text
    #noReText {
        left: 50%;
        top: 100px;
        font-size: 3rem;
        transform: translateX(-50%);
    }
}
</style>