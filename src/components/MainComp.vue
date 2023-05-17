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
        this.moviesSeries()
    },
    methods: {
        moviesSeries() {
            
            // film top rated
            axios.get(`${store.pathTopRated}${store.apiKey}${store.pageTopRated}`)
                .then(response => {

                    store.arrayResultsTopRated = response.data.results              
                })

            // film - popular
            axios.get(`${store.pathPopular}${store.apiKey}${store.pagePopular}`)
                .then(response => {

                    store.arrayResultsPopular = response.data.results              
                })

            // tv series - top rated
            axios.get(`${store.pathSeriesTopRated}${store.apiKey}${store.pageSeriesTopRated}`)
                .then(response => {

                    store.arrayResultsSeriesTopRated = response.data.results              
                })

            // tv series - - popular
            axios.get(`${store.pathSeriesPopular}${store.apiKey}${store.pageSeriesPopular}`)
                .then(response => {

                    store.arrayResultsSeriesPopular = response.data.results              
                })
        },
        noResults() {

            // Se non ci sono risultati in entrambi gli array return true
            if (store.noResults == true && store.noResultsSeries == true) {
                                
                store.bol = false
                return true
            } else {

                return false
            }
        }
    }
}
</script>

<template>
    <!-- no results found -->
    <div id="noResults" class="d-flex justify-content-center bg-white position-relative" v-if="noResults()">
        
        <div id="noReText" class="position-absolute">
            <span class="text-uppercase text-black">no results found</span>
        </div>
        
        <iframe width="1120" height="630" src="https://www.youtube.com/embed/2apVwq-pX9E?start=4&autoplay=1&controls=0&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>

    <div class="container">

        <!-- Home -->
        <div>
            <!-- Button trigger modal -->
            <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button> -->

            <!-- Modal -->
            <!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Modal body
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- movies -->
            <div>
                <!-- Top Rated -->
                <div class="row m-0" v-if="store.bol">
                    <h2 class="text-white mt-4">Top Rated</h2>
                    <CardComp v-for="(elem, index) in store.arrayResultsTopRated" :key="index" 
        
                        :title= "elem.title"
                        :original_title= "elem.original_title"
                        :language= "elem.original_language"
                        :vote= "elem.vote_average"
                        :image="elem.poster_path"
                        :overview="elem.overview">
                    </CardComp>

                    <!-- modal -->
                    <div class="trailer d-none p-0">
                        <div class="trailer-content">

                        </div>

                    </div>
                </div>
        
                <!-- Popular -->
                <div class="row m-0" v-if="store.bol">
                    <h2 class="text-white mt-4">Popular</h2>
                    <CardComp v-for="(elem, index) in store.arrayResultsPopular" :key="index" 
        
                        :title= "elem.title"
                        :original_title= "elem.original_title"
                        :language= "elem.original_language"
                        :vote= "elem.vote_average"
                        :image="elem.poster_path"
                        :overview="elem.overview">
                    </CardComp>
                </div>
            </div>

            <!-- tv series -->
            <div>
                <!-- Top Rated -->
                <div class="row m-0" v-if="store.bol">
                    <h2 class="text-white mt-4">Top Rated</h2>
                    <CardComp v-for="(elem, index) in store.arrayResultsSeriesTopRated" :key="index" 
        
                        :title= "elem.name"
                        :original_title= "elem.original_name"
                        :language= "elem.original_language"
                        :vote= "elem.vote_average"
                        :image="elem.poster_path"
                        :overview="elem.overview">
                    </CardComp>
                </div>
        
                <!-- Popular -->
                <div class="row m-0" v-if="store.bol">
                    <h2 class="text-white mt-4">Popular</h2>
                    <CardComp v-for="(elem, index) in store.arrayResultsSeriesPopular" :key="index" 
        
                        :title= "elem.name"
                        :original_title= "elem.original_name"
                        :language= "elem.original_language"
                        :vote= "elem.vote_average"
                        :image="elem.poster_path"
                        :overview="elem.overview">
                    </CardComp>
                </div>
            </div>
        </div>

            
        <!-- search movies -->
        <div class="row m-0" v-if="store.arrayResults.length">
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

        <!-- search tv series -->
        <div class="row m-0" v-if="store.arrayResultsSeries.length">

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

.container {
    position: relative;

    .trailer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.2);
        @include center ('both');

        .trailer-content {
            // max-width: 90%;
            // min-width: 500px;
            width: 400px;
            height: 300px;
            background-color: white;
        }
    }

}
</style>