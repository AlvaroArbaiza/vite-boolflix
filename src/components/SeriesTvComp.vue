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

        // chiamata di tuttte le api per series in modo asincrono
        async series() {

            try {
                const [ response1, response2 ] = await Promise.all([

                    axios.get(`${store.path}${store.SeriesTopRated}${store.apiKey}${store.page}`),
                    axios.get(`${store.path}${store.SeriesPopular}${store.apiKey}${store.page}`)
                ]);

                store.arrayResultsSeriesTopRated = response1.data.results;
                store.arrayResultsSeriesPopular = response2.data.results;
                
            } catch (error) {
                console.error(error);
            }
        },

        // funzione per la chiamata dei trailers di Movies
        async trailerSeries(movieId, index, seriesType) {

            if ( !store.closeModal) {

                const response = await axios.get(`https://api.themoviedb.org/3/tv/${movieId}/videos${store.apiKey}`);

                store.arrayTrailers = response.data.results;

                store.arrayTrailers.forEach( (element, ind ) => {
                        
                    if ( element.type == "Trailer" || element.type == "Clip") {
                        store.tlrIndexKey = ind;
                    } 
                });
                
                // assegnazione dell'indice alla variabile
                if (seriesType === "topRated") {
                    store.tlrIndSeries = index;
                } else if (seriesType === "popular") {
                    store.tlrIndSeries2 = index;
                }

            } else {

                // resetto l'array e l'indice
                store.arrayTrailers = [];
                store.tlrIndSeries = "";
                store.tlrIndSeries2 = "";

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
                @trailer="trailerSeries(elem.id, index, 'topRated')"
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
                @trailer="trailerSeries(elem.id, index, 'popular')"
                @closeModal="closeMod">
            </CardComp>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;

</style>