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
    mounted() {
        this.moviesSeries()
    },
    created() {
    },
    computed: {
    },
    methods: {

        // chiamata di tuttte le apin in modo asincrono
        async moviesSeries() {

            try {
                const [response1, response2, response3, response4] = await Promise.all([

                    axios.get(`${store.path}${store.TopRated}${store.apiKey}${store.page}`),
                    axios.get(`${store.path}${store.Popular}${store.apiKey}${store.page}`),
                    axios.get(`${store.path}${store.SeriesTopRated}${store.apiKey}${store.page}`),
                    axios.get(`${store.path}${store.SeriesPopular}${store.apiKey}${store.page}`)
                ]);

                store.arrayResultsTopRated = response1.data.results;
                store.arrayResultsPopular = response2.data.results;
                store.arrayResultsSeriesTopRated = response3.data.results;
                store.arrayResultsSeriesPopular = response4.data.results;
                
            } catch (error) {
                console.error(error);
            }
        },

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
        },

        // Funzione per scorrere avanti nelle slide s
        next(event) {

            let y, z;
            const next = event.target.parentNode.parentNode.querySelector(".next");
            const prev = event.target.parentNode.parentNode.querySelector(".prev");

            store.arrayResultsTopRated.length; // numero di film 
            let slidesToMove = 3; // numero di film da spostare ogni click
            let slidesShowed = 6; // numero di film mostrati

            y = Math.ceil( (store.arrayResultsTopRated.length - slidesShowed) / slidesToMove ); // numero di volte che potrà scorrere

            z = 50 * y // distanza massima che lo slide potrà scorrere
            console.log(z);
        
            // aumento di 50 ogni click
            store.num += 50;

            // se la distanza è uguale o minore della distanza massima lo slide potrà scorrere
            if ( store.num <= z) {

                // Targhettizzo row, uscendo da next, prendendo il padre e poi selezionando row
                const row = event.target.parentNode.parentNode.querySelector(".row");                
                
                row.style.left = `-${store.num}%`;
            } 

            // Se lo slide è alla schermata finale fa scomparire il div next
            if ( store.num === z ) {
                next.style.display = "none";                
            } else {
                next.style.display = "block";
            }

            // Se lo slide è alla schermata iniziale fa scomparire il div prev
            if ( store.num !== 0 ) {
                prev.style.display = "block";
            } else {
                prev.style.display = "none";
            }
        },

        // funzione per scorrere indietro nelle slides
        prev(event) {

            let y, z;
            const prev = event.target.parentNode.parentNode.querySelector(".prev");
            const next = event.target.parentNode.parentNode.querySelector(".next");

            store.arrayResultsTopRated.length; // numero di film 
            let slidesToMove = 3; // numero di film da spostare ogni click
            let slidesShowed = 6; // numero di film mostrati

            y = Math.ceil( (store.arrayResultsTopRated.length - slidesShowed) / slidesToMove ); // numero di volte che potrà scorrere

            z = 50 * y // distanza massima che lo slide potrà scorrere

            // sottraggo di 50 ogni volta
            store.num -= 50;
            
            if ( store.num <= z) {

                // Targhettizzo row, uscendo da next, prendendo il padre e poi selezionando row
                const row = event.target.parentNode.parentNode.querySelector(".row");
                            
                row.style.left = `-${store.num}%`;
            }

            // Se lo slide è alla schermata iniziale fa scomparire il div prev
            if ( store.num !== 0 ) {
                prev.style.display = "block";
            } else {
                prev.style.display = "none";
            }

            // Se lo slide è alla schermata finale fa scomparire il div next
            if ( store.num === z ) {
                next.style.display = "none";                
            } else {
                next.style.display = "block";
            }
        }
    }
}
</script>

<template>

    <!----------------- no results found ----------------->
    <!-- compare solo quando non ci sono risultati nella ricerca -->
    <!-- <div id="noResults" class="d-flex justify-content-center bg-white position-relative" v-if="store.noResults">
        
        <div id="noReText" class="position-absolute">
            <span class="text-uppercase text-black">no results found</span>
        </div>
        
        <iframe width="1120" height="630" src="https://www.youtube.com/embed/2apVwq-pX9E?start=4&autoplay=1&controls=0&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div> -->

    <div class="container">

        <!-------------------------- Home -------------------------->
        <div>

            <!---------------- films ---------------->

            <!-- title category -->
            <div>
                <h2 class="text-white fs-1 my-4 fw-bold">Films</h2>
            </div>

            <!-- Top Rated -->
            <div class="carousel">

                <h3 class="fs-2 greyH3">Top Rated</h3>
                <div class="row m-0" >

                    <CardComp v-for="(elem, index) in store.arrayResultsTopRated" :key="index" 
        
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

                <!-- Next -->
                <div class="next my-2">
                    <i @click="next" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-right"></i>
                </div>
                <!-- Prev -->
                <div class="prev my-2">
                    <i @click="prev" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-left"></i>
                </div>
            </div>
    
            <!-- Popular -->
            <div class="carousel">
            
                <h3 class="fs-2 greyH3 mt-4">Popular</h3>
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
                        @trailer="trailersMovie(elem.id, index)"
                        @closeModal="closeMod">
                    </CardComp>
                </div>

                <!-- Next -->
                <div class="next my-2">
                    <i @click="next" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-right"></i>
                </div>
                <!-- Prev -->
                <div class="prev my-2">
                    <i @click="prev" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-left"></i>
                </div>
            </div>

            <!---------------- tv series ---------------->

            <!-- title category -->
            <div>
                <h2 class="text-white fs-1 my-4 fw-bold">Tv Series</h2>
            </div>

            <!-- Top Rated -->
            <div class="carousel">
            
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
                        @trailer="trailersSeries(elem.id, index)"
                        @closeModal="closeMod">
                    </CardComp>
                </div>

                <!-- Next -->
                <div class="next my-2">
                    <i @click="next" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-right"></i>
                </div>
                <!-- Prev -->
                <div class="prev my-2">
                    <i @click="prev" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-left"></i>
                </div>
            </div>
    
            <!-- Popular -->
            <div class="carousel">
            
                <h3 class="fs-2 greyH3 mt-4">Popular</h3>
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
                        @trailer="trailersSeries(elem.id, index)"
                        @closeModal="closeMod">
                    </CardComp>
                </div>

                <!-- Next -->
                <div class="next my-2">
                    <i @click="next" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-right"></i>
                </div>
                <!-- Prev -->
                <div class="prev my-2">
                    <i @click="prev" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-left"></i>
                </div>
            </div>
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

.container {

    // carousel
    .carousel {
        overflow-x: clip;        
        scroll-behavior: smooth;
        position: relative;

        // next
        .next {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 14rem;
            height: calc(100% - 3.5rem);
            background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.8) 55% 97%, transparent 98%);
            opacity: 0;

            i{
                font-size: 8rem;
            }

            &:hover {
                opacity: 1;
            }
        }

        // prev
        .prev {
            display: none;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 14rem;
            height: calc(100% - 3.5rem);
            background: linear-gradient(to left, transparent, rgba(0, 0, 0, 0.8) 55% 97%, transparent 98%);
            opacity: 0;

            i{
                font-size: 8rem;
            }

            &:hover {
                opacity: 1;
            }
        }

        // row
        .row {
            flex-wrap: nowrap;
            position: relative;
        }
    }
}
</style>