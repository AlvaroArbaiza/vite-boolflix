<script>
import { store } from '../store.js';
import axios from 'axios';
import CardComp from './CardComp.vue';

export default {
    name: 'FilmComp',
    components: {
        CardComp
    },
    data() {
        return {
            store
        };
    },
    mounted() {
        this.films()
    },    
    methods: {    
        // funzione per la chiamata dei films
        films() {
            // film top rated
            axios.get(`${store.path}${store.TopRated}${store.apiKey}${store.page}`)
                .then(response => {

                    store.arrayResultsTopRated = response.data.results              
                })

            // film - popular
            axios.get(`${store.path}${store.Popular}${store.apiKey}${store.page}`)
                .then(response => {

                    store.arrayResultsPopular = response.data.results              
                })
        },
        // funzione per la produzione del trailer del film nel quale avviene il click ( movie top rated --- movie on search)
        trailerMovieTopR(movieId, index) {

            if ( !store.closeModal) {

                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos${store.apiKey}`)
                .then(response => {
                    
                    store.arrayTrailers = response.data.results;    

                    store.arrayTrailers.forEach( (element, index ) => {
                        
                        if ( element.type == "Trailer") {
                            store.tlrIndexKey = index;
                        } else if ( element.type == "Clip" ) {
                            store.tlrIndexKey = index;

                        }
                    });
                })

                // assegnazione dell'indice alla variabile
                store.tlrInd = index;

            } else {

                // resetto l'array e l'indice
                store.arrayTrailers = [];
                store.tlrInd = '';

                // la variabile diventa di nuovo false resettandosi una volta chiuso il modal
                store.closeModal = false;
            }            
        },
        // funzione per i trailer di movie popular
        trailerMoviePop(movieId, index) {

            if ( !store.closeModal) {

                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos${store.apiKey}`)
                .then(response => {
                    
                    store.arrayTrailers = response.data.results;   

                    store.arrayTrailers.forEach( (element, index ) => {
                        
                        if ( element.type == "Trailer") {
                            store.tlrIndexKey = index;
                        } else if ( element.type == "Clip" ) {
                            store.tlrIndexKey = index;

                        }
                    });
                })

                // assegnazione dell'indice alla variabile
                store.tlrInd2 = index;

            } else {

                store.arrayTrailers = [];
                store.tlrInd2 = '';

                // la variabile diventa di nuovo false resettandosi una volta chiuso il modal
                store.closeModal = false;

            }
        },
        // Funzione per la chiusura del modal 
        closeMod() {
            store.closeModal = true;
        },
    }
}
</script>
 
<template>
    <div class="container">
        <div>
            <h2 class="text-white fs-1 my-4 fw-bold">Films</h2>
        </div>
        <h3 class="fs-2 greyH3">Top Rated</h3>
        <div class="row m-0">

            <CardComp v-for="(elem, index) in store.arrayResultsTopRated" :key="index"  

                :title= "elem.title"
                :original_title= "elem.original_title"
                :language= "elem.original_language"
                :vote= "elem.vote_average"
                :image="elem.poster_path"
                :overview="elem.overview"
                :ind="index"
                :indTrailer="store.tlrInd"
                @trailer="trailerMovieTopR(elem.id, index)"
                @closeModal="closeMod">
            </CardComp>
        </div>
        <h3 class="fs-2 greyH3">Popular</h3>
        <div class="row m-0">

            <CardComp v-for="(elem, index) in store.arrayResultsPopular" :key="index"  

                :title= "elem.title"
                :original_title= "elem.original_title"
                :language= "elem.original_language"
                :vote= "elem.vote_average"
                :image="elem.poster_path"
                :overview="elem.overview"
                :ind="index"
                :indTrailer="store.tlrInd2"
                @trailer="trailerMoviePop(elem.id, index)"
                @closeModal="closeMod">
            </CardComp>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;

</style>