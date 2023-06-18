<script>
import { store } from '../store.js';
import axios from 'axios';
import CardComp from './CardComp.vue';

export default {
    name: 'SearchResultsComp',
    components: {
        CardComp
    },
    data() {
        return {
            store
        };
    },
    mounted() {
    },
    created() {
    },
    computed: {
    },
    methods: {

        // funzione per la chiamata dei trailers di Movies
        async trailersMovie(movieId, index) {

            if ( !store.closeModal) {

                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos${store.apiKey}`);

                store.arrayTrailers = response.data.results;

                store.arrayTrailers.forEach( (element, ind ) => {
                        
                    if ( element.type == "Trailer") {
                        store.tlrIndexKey = ind;
                    } else if ( element.type == "Clip" ) {
                        store.tlrIndexKey = ind;
                    }
                });
                
                // assegnazione dell'indice alla variabile
                store.tlrInd = index;
            } else {

                // resetto l'array e l'indice
                store.arrayTrailers = [];
                store.tlrInd = "";

                // la variabile diventa di nuovo false resettandosi una volta chiuso il modal
                store.closeModal = false;

            }        
        },

        // funzione per la chiamata dei trailers di Movies
        async trailersSeries(movieId, index) {

            if ( !store.closeModal) {

                const response = await axios.get(`https://api.themoviedb.org/3/tv/${movieId}/videos${store.apiKey}`);

                // assegnazione di results ad arrayTrailers
                store.arrayTrailers = response.data.results;
                store.arrayTrailers.forEach( (element, index ) => {
                        
                    if ( element.type == "Trailer") {
                        store.tlrIndexKey = index;
                    } else if ( element.type == "Clip" ) {
                        store.tlrIndexKey = index;
                    }
                });
                
                // assegnazione dell'indice alla variabile
                store.tlrIndSeries = index;
            } else {

                // resetto l'array e l'indice
                store.arrayTrailers = [];
                store.tlrIndSeries = "";

                // la variabile diventa di nuovo false resettandosi una volta chiuso il modal
                store.closeModal = false;
            }        
        },

        // Funzione per la chiusura del modal 
        closeMod() {
            store.closeModal = true;
        }
    }
}
</script>

<template>

    <!----------------- no results found ----------------->
    <!-- compare solo quando non ci sono risultati nella ricerca -->
    <div id="noResults" class="d-flex justify-content-center bg-white position-relative" v-if="store.noResults">
        
        <div id="noReText" class="position-absolute">
            <span class="text-uppercase text-black">no results found</span>
        </div>
        
        <iframe width="1120" height="630" src="https://www.youtube.com/embed/2apVwq-pX9E?start=4&autoplay=1&controls=0&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>

    <div class="container">
            
        <!----------- search movies ----------->
        <div class="row m-0" v-if="store.arrayResultsMovies.length">
            <h2 class="text-white fs-1 my-4 fw-bold">Movies</h2>
            <CardComp v-for="(elem, index) in store.arrayResultsMovies" :key="index" 

                :title= "elem.title"
                :original_title= "elem.original_title"
                :language= "elem.original_language"
                :vote= "elem.vote_average"
                :image="elem.poster_path"
                :overview="elem.overview"
                :ind="index"
                :indTrailer="store.tlrInd"
                @trailer="trailersMovie(elem.id, index)"
                @closeModal="closeMod">
            </CardComp>
        </div>

        <!----------- search tv series ----------->
        <div class="row m-0" v-if="store.arrayResultsSeries.length">

            <h2 class="text-white fs-1 my-4 fw-bold">Series</h2>
            <CardComp v-for="(elem, index) in store.arrayResultsSeries" :key="index" 

                :title= "elem.name"
                :original_title= "elem.original_name"
                :language= "elem.original_language"
                :vote= "elem.vote_average"
                :image="elem.poster_path"
                :overview="elem.overview"
                :ind="index"
                :indTrailer="store.tlrIndSeries"
                @trailer="trailersSeries(elem.id, index)"
                @closeModal="closeMod">
            </CardComp>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;


// no results on search movies and series
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