<script>
import { store } from '../store.js';
import axios from 'axios';
import CardComp from './CardComp.vue';

export default {
    name: 'SeriesTvComp',
    components: {
        CardComp
    },
    data() {
        return {
            store
        };
    },    
    mounted() {
        this.series()
    },
    methods: {  
        series() {
            // tv series - top rated
            axios.get(`${store.path}${store.SeriesTopRated}${store.apiKey}${store.page}`)
                .then(response => {

                    store.arrayResultsSeriesTopRated = response.data.results              
                })

            // tv series - - popular
            axios.get(`${store.path}${store.SeriesPopular}${store.apiKey}${store.page}`)
                .then(response => {

                    store.arrayResultsSeriesPopular = response.data.results              
                })
        },
        // funzione per la produzione del trailer della serie nel quale avviene il click ( series top rated --- series on search)
        trailerSeriesTR(movieId, index) {

            if ( !store.closeModal) {

                axios.get(`https://api.themoviedb.org/3/tv/${movieId}/videos${store.apiKey}`)
                .then(response => {
                    
                    store.arrayTrailers = response.data.results;   

                    store.arrayTrailers.forEach( (element, index ) => {
                        
                        // se element.type corrisponde a trailer mi torna l'indice altrimenti cerco la clip
                        if ( element.type == "Trailer") {
                            store.tlrIndexKey = index;
                        } else if ( element.type == "Clip" ) {
                            store.tlrIndexKey = index;

                        }
                    });
                })

                store.tlrIndSeries = index;

            } else {

                store.arrayTrailers = [];
                store.tlrIndSeries = '';

                // la variabile diventa di nuovo false resettandosi una volta chiuso il modal
                store.closeModal = false;

            }
        },
        // funzione per i trailer di series popular
        trailerSeriesPop(movieId, index) {

            if ( !store.closeModal) {
                axios.get(`https://api.themoviedb.org/3/tv/${movieId}/videos${store.apiKey}`)
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

                store.tlrIndSeries2 = index;
            } else {

                store.arrayTrailers = [];
                store.tlrIndSeries2 = '';

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
            <h2 class="text-white fs-1 my-4 fw-bold">Tv Series</h2>
        </div>
        <h3 class="fs-2 greyH3">Top Rated</h3>
        <div class="row m-0">

            <CardComp v-for="(elem, index) in store.arrayResultsSeriesTopRated" :key="index"  

                :title= "elem.name"
                :original_title= "elem.original_name"
                :language= "elem.original_language"
                :vote= "elem.vote_average"
                :image="elem.poster_path"
                :overview="elem.overview"
                :ind="index"
                :indTrailer="store.tlrIndSeries"
                @trailer="trailerSeriesTR(elem.id, index)"
                @closeModal="closeMod">
            </CardComp>
        </div>
        <h3 class="fs-2 greyH3">Popular</h3>
        <div class="row m-0">

            <CardComp v-for="(elem, index) in store.arrayResultsSeriesPopular" :key="index"  

                :title= "elem.name"
                :original_title= "elem.original_name"
                :language= "elem.original_language"
                :vote= "elem.vote_average"
                :image="elem.poster_path"
                :overview="elem.overview"
                :ind="index"
                :indTrailer="store.tlrIndSeries2"
                @trailer="trailerSeriesPop(elem.id, index)"
                @closeModal="closeMod">
            </CardComp>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;

</style>