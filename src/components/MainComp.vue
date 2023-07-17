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
            store,
            slidePositions: {
                arrayResultsNowPlaying: 0,
                arrayResultsUpcoming: 0,
                arrayResultsTopRated: 0,
                arrayResultsPopular: 0,
                arrayResultsSeriesTopRated: 0,
                arrayResultsSeriesPopular: 0,
                arrayResultsSeriesAiringToday: 0,
                arrayResultsSeriesOnTheAir: 0
            }
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
                const [response1, response2, response3, response4, response5, response6, response7, response8] = await Promise.all([

                    // films
                    axios.get(`${store.path}${store.TopRated}${store.apiKey}${store.page}`),
                    axios.get(`${store.path}${store.Popular}${store.apiKey}${store.page}`),
                    axios.get(`${store.path}${store.NowPlaying}${store.apiKey}${store.page}`),
                    axios.get(`${store.path}${store.Upcoming}${store.apiKey}${store.page}`),

                    // tv series
                    axios.get(`${store.path}${store.SeriesTopRated}${store.apiKey}${store.page}`),
                    axios.get(`${store.path}${store.SeriesPopular}${store.apiKey}${store.page}`),
                    axios.get(`${store.path}${store.SeriesAiringToday}${store.apiKey}${store.page}`),
                    axios.get(`${store.path}${store.SeriesOnTheAir}${store.apiKey}${store.page}`)
                ]);

                // films
                store.arrayResultsTopRated = response1.data.results;
                store.arrayResultsPopular = response2.data.results;
                store.arrayResultsNowPlaying = response3.data.results;
                store.arrayResultsUpcoming = response4.data.results;

                // tv series
                store.arrayResultsSeriesTopRated = response5.data.results;
                store.arrayResultsSeriesPopular = response6.data.results;
                store.arrayResultsSeriesAiringToday = response7.data.results;
                store.arrayResultsSeriesOnTheAir = response8.data.results;
                
            } catch (error) {
                console.error(error);
            }
        },

        // funzione per la chiamata dei trailers di Movies
        async trailersMovie(movieId, index, filmType) {

            if ( !store.closeModal) {

                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos${store.apiKey}`);

                store.arrayTrailers = response.data.results;

                store.arrayTrailers.forEach( (element, ind ) => {
                        
                    if ( element.type === "Trailer" || element.type === "Clip") {
                        store.tlrIndexKey = ind;
                    } 
                });
                
                // assegnazione dell'indice alla variabile
                if (filmType === "topRated") {
                    store.tlrInd = index;
                } else if (filmType === "popular") {
                    store.tlrInd2 = index;
                } else if (filmType === "upcoming") {
                    store.tlrInd3 = index;
                } else if (filmType === "nowplaying") {
                    store.tlrInd4 = index;
                }

            } else {

                // resetto l'array e l'indice
                store.arrayTrailers = [];
                store.tlrInd = "";
                store.tlrInd2 = "";
                store.tlrInd3 = "";
                store.tlrInd4 = "";

                // la variabile diventa di nuovo false resettandosi una volta chiuso il modal
                store.closeModal = false;
            }        
        },

        // funzione per la chiamata dei trailers di Movies
        async trailersSeries(movieId, index, seriesType) {

            if ( !store.closeModal) {

                const response = await axios.get(`https://api.themoviedb.org/3/tv/${movieId}/videos${store.apiKey}`);

                // assegnazione di results ad arrayTrailers
                store.arrayTrailers = response.data.results;
                store.arrayTrailers.forEach( (element, ind ) => {
                        
                    if ( element.type === "Trailer" || element.type === "Clip") {
                        store.tlrIndexKey = ind;
                    } 
                });

                // assegnazione dell'indice alla variabile
                if ( seriesType === "topRated" ) {
                    store.tlrIndSeries = index;
                } else if ( seriesType === "popular" ) {
                    store.tlrIndSeries2 = index;
                } else if ( seriesType === "airingtoday" ) {
                    store.tlrIndSeries3 = index;
                } else if ( seriesType ==="ontheair" ) {
                    store.tlrIndSeries4 = index;
                }
            } else {

                // resetto l'array e l'indice
                store.arrayTrailers = [];
                store.tlrIndSeries = "";
                store.tlrIndSeries2 = "";
                store.tlrIndSeries3 = "";
                store.tlrIndSeries4 = "";

                // la variabile diventa di nuovo false resettandosi una volta chiuso il modal
                store.closeModal = false;
            }        
        },

        // Funzione per la chiusura del modal 
        closeMod() {
            store.closeModal = true;
        },

        // Funzione per scorrere avanti nelle slide s
        next(event, array, arrayName) {

            let y, z;

            let currentPosition = this.slidePositions[arrayName];

            const next = event.target.parentNode.parentNode.querySelector(".next");
            const prev = event.target.parentNode.parentNode.querySelector(".prev");

            let slidesToMove = 3; // numero di film da spostare ogni click
            let slidesShowed = 6; // numero di film mostrati

            y = Math.ceil( (array.length - slidesShowed) / slidesToMove ); // numero di volte che potrà scorrere

            z = 50 * y // distanza massima che lo slide potrà scorrere
            console.log(z);
        
            // aumento di 50 ogni click
            store.num += 50;

            currentPosition += 50;

            this.slidePositions[arrayName] = currentPosition;

            // se la distanza è uguale o minore della distanza massima lo slide potrà scorrere
            if ( currentPosition <= z) {

                // Targhettizzo row, uscendo da next, prendendo il padre e poi selezionando row
                const row = event.target.parentNode.parentNode.querySelector(".row");                
                
                row.style.left = `-${currentPosition}%`;
            } 

            // Se lo slide è alla schermata finale fa scomparire il div next
            if ( currentPosition === z ) {
                next.style.display = "none";                
            } else {
                next.style.display = "block";
            }

            // Se lo slide è alla schermata iniziale fa scomparire il div prev
            if ( currentPosition !== 0 ) {
                prev.style.display = "block";
            } else {
                prev.style.display = "none";
            }
        },

        // funzione per scorrere indietro nelle slides
        prev(event, array, arrayName) {

            let y, z;

            let currentPosition = this.slidePositions[arrayName];

            const prev = event.target.parentNode.parentNode.querySelector(".prev");
            const next = event.target.parentNode.parentNode.querySelector(".next");

            let slidesToMove = 3; // numero di film da spostare ogni click
            let slidesShowed = 6; // numero di film mostrati

            y = Math.ceil( (array.length - slidesShowed) / slidesToMove ); // numero di volte che potrà scorrere

            z = 50 * y // distanza massima che lo slide potrà scorrere

            // sottraggo di 50 ogni volta
            currentPosition -= 50;

            this.slidePositions[arrayName] = currentPosition;
            
            if ( currentPosition <= z) {

                // Targhettizzo row, uscendo da next, prendendo il padre e poi selezionando row
                const row = event.target.parentNode.parentNode.querySelector(".row");
                            
                row.style.left = `-${currentPosition}%`;
            }

            // Se lo slide è alla schermata iniziale fa scomparire il div prev
            if ( currentPosition !== 0 ) {
                prev.style.display = "block";
            } else {
                prev.style.display = "none";
            }

            // Se lo slide è alla schermata finale fa scomparire il div next
            if ( currentPosition === z ) {
                next.style.display = "none";                
            } else {
                next.style.display = "block";
            }
        }
    }
}
</script>

<template>
    <div class="container">

        <!-------------------------- Home -------------------------->
        <div>

            <!---------------- films ---------------->

            <!-- Now Playing -->
            <div class="carousel mt-5">
                
                <!-- title -->
                <div class="title d-flex column-gap-4 mb-1">
                    <span class="d-flex column-gap-4">
                        <h2 class="text-white fw-bold mb-0">Films</h2>
                        <h4 class="greyH3 mb-0 align-self-end">
                            Now Playing
                            <router-link to="/NowPlaying" class="ms-3 fs-6 text-decoration-none">
                                <span>View more</span>
                            </router-link>
                        </h4>
                    </span>
                </div>

                <div class="row m-0" >

                    <CardComp v-for="(elem, index) in store.arrayResultsNowPlaying" :key="index" 

                        :title= "elem.title"
                        :original_title= "elem.original_title"
                        :language= "elem.original_language"
                        :vote= "elem.vote_average"
                        :image="elem.poster_path"
                        :overview="elem.overview"
                        :ind="index"
                        :indTrailer="store.tlrInd4"
                        @trailer="trailersMovie(elem.id, index, 'nowplaying')"
                        @closeModal="closeMod">
                    </CardComp> 
                    
                </div>

                <!-- Next -->
                <div class="next my-2">
                    <i @click="next($event, store.arrayResultsNowPlaying, 'arrayResultsNowPlaying')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-right"></i>
                </div>
                <!-- Prev -->
                <div class="prev my-2">
                    <i @click="prev($event, store.arrayResultsNowPlaying, 'arrayResultsNowPlaying')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-left"></i>
                </div>
            </div>
            
            <!-- Upcoming -->
            <div class="carousel">

                <!-- title -->
                <div class="title d-flex column-gap-4 mb-1 mt-4">
                    <span class="d-flex column-gap-4">
                        <h2 class="text-white fw-bold mb-0">Films</h2>
                        <h4 class="greyH3 mb-0 align-self-end">
                            Upcoming
                            <router-link to="/Upcoming" class="ms-3 fs-6 text-decoration-none">
                                <span>View more</span>
                            </router-link>
                        </h4>
                    </span>
                </div>

                <div class="row m-0" >

                    <CardComp v-for="(elem, index) in store.arrayResultsUpcoming" :key="index" 
        
                        :title= "elem.title"
                        :original_title= "elem.original_title"
                        :language= "elem.original_language"
                        :vote= "elem.vote_average"
                        :image="elem.poster_path"
                        :overview="elem.overview"
                        :ind="index"
                        :indTrailer="store.tlrInd3"
                        @trailer="trailersMovie(elem.id, index, 'upcoming')"
                        @closeModal="closeMod">
                    </CardComp> 
                    
                </div>

                <!-- Next -->
                <div class="next my-2">
                    <i @click="next($event, store.arrayResultsUpcoming, 'arrayResultsUpcoming')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-right"></i>
                </div>
                <!-- Prev -->
                <div class="prev my-2">
                    <i @click="prev($event, store.arrayResultsUpcoming, 'arrayResultsUpcoming')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-left"></i>
                </div>
            </div>

            <!-- Top Rated -->
            <div class="carousel">
                
                <div class="d-flex column-gap-4">
                    <h3 class="fs-2 greyH3 mt-4">Top Rated</h3>
                    <a href="#" class="align-self-end pb-2 text-decoration-none">
                        <span>View more</span>
                    </a>
                </div>

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
                        @trailer="trailersMovie(elem.id, index, 'topRated')"
                        @closeModal="closeMod">
                    </CardComp> 
                    
                </div>

                <!-- Next -->
                <div class="next my-2">
                    <i @click="next($event, store.arrayResultsTopRated, 'arrayResultsTopRated')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-right"></i>
                </div>
                <!-- Prev -->
                <div class="prev my-2">
                    <i @click="prev($event, store.arrayResultsTopRated, 'arrayResultsTopRated')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-left"></i>
                </div>
            </div>
    
            <!-- Popular -->
            <div class="carousel">
            
                <div class="d-flex column-gap-4">
                    <h3 class="fs-2 greyH3 mt-4">Popular</h3>
                    <a href="#" class="align-self-end pb-2 text-decoration-none">
                        <span>View more</span>
                    </a>
                </div>

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
                        @trailer="trailersMovie(elem.id, index, 'popular')"
                        @closeModal="closeMod">
                    </CardComp>
                </div>

                <!-- Next -->
                <div class="next my-2">
                    <i @click="next($event, store.arrayResultsPopular, 'arrayResultsPopular')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-right"></i>
                </div>
                <!-- Prev -->
                <div class="prev my-2">
                    <i @click="prev($event, store.arrayResultsPopular, 'arrayResultsPopular')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-left"></i>
                </div>
            </div>

            <!---------------- tv series ---------------->

            <!-- title category -->
            <div>
                <h2 class="text-white fs-1 my-4 fw-bold">Tv Series</h2>
            </div>

            <!-- On the Air -->
            <div class="carousel">
            
                <div class="d-flex column-gap-4">
                    <h3 class="fs-2 greyH3">On the Air</h3>
                    <a href="#" class="align-self-end pb-2 text-decoration-none">
                        <span>View more</span>
                    </a>
                </div>

                <div class="row m-0">
                    <CardComp v-for="(elem, index) in store.arrayResultsSeriesOnTheAir" :key="index" 
        
                        :title= "elem.name"
                        :original_title= "elem.original_name"
                        :language= "elem.original_language"
                        :vote= "elem.vote_average"
                        :image="elem.poster_path"
                        :overview="elem.overview"
                        :ind="index"
                        :indTrailer="store.tlrIndSeries4"
                        @trailer="trailersSeries(elem.id, index, 'ontheair')"
                        @closeModal="closeMod">
                    </CardComp>
                </div>

                <!-- Next -->
                <div class="next my-2">
                    <i @click="next($event, store.arrayResultsSeriesOnTheAir, 'arrayResultsSeriesOnTheAir')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-right"></i>
                </div>
                <!-- Prev -->
                <div class="prev my-2">
                    <i @click="prev($event, store.arrayResultsSeriesOnTheAir, 'arrayResultsSeriesOnTheAir')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-left"></i>
                </div>
            </div>

            <!-- Airing Today -->
            <div class="carousel">
                
                <div class="d-flex column-gap-4">
                    <h3 class="fs-2 greyH3 mt-4">Airing Today</h3>
                    <a href="#" class="align-self-end pb-2 text-decoration-none">
                        <span>View more</span>
                    </a>
                </div>
                <div class="row m-0">
                    <CardComp v-for="(elem, index) in store.arrayResultsSeriesAiringToday" :key="index" 
        
                        :title= "elem.name"
                        :original_title= "elem.original_name"
                        :language= "elem.original_language"
                        :vote= "elem.vote_average"
                        :image="elem.poster_path"
                        :overview="elem.overview"
                        :ind="index"
                        :indTrailer="store.tlrIndSeries3"
                        @trailer="trailersSeries(elem.id, index, 'airingtoday')"
                        @closeModal="closeMod">
                    </CardComp>
                </div>

                <!-- Next -->
                <div class="next my-2">
                    <i @click="next($event, store.arrayResultsSeriesAiringToday, 'arrayResultsSeriesAiringToday')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-right"></i>
                </div>
                <!-- Prev -->
                <div class="prev my-2">
                    <i @click="prev($event, store.arrayResultsSeriesAiringToday, 'arrayResultsSeriesAiringToday')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-left"></i>
                </div>
            </div>

            <!-- Top Rated -->
            <div class="carousel">
            
                <div class="d-flex column-gap-4">
                    <h3 class="fs-2 greyH3 mt-4">Top Rated</h3>
                    <a href="#" class="align-self-end pb-2 text-decoration-none">
                        <span>View more</span>
                    </a>
                </div>

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
                        @trailer="trailersSeries(elem.id, index, 'topRated')"
                        @closeModal="closeMod">
                    </CardComp>
                </div>

                <!-- Next -->
                <div class="next my-2">
                    <i @click="next($event, store.arrayResultsSeriesTopRated, 'arrayResultsSeriesTopRated')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-right"></i>
                </div>
                <!-- Prev -->
                <div class="prev my-2">
                    <i @click="prev($event, store.arrayResultsSeriesTopRated, 'arrayResultsSeriesTopRated')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-left"></i>
                </div>
            </div>
    
            <!-- Popular -->
            <div class="carousel">
            
                <div class="d-flex column-gap-4">
                    <h3 class="fs-2 greyH3 mt-4">Popular</h3>
                    <a href="#" class="align-self-end pb-2 text-decoration-none">
                        <span>View more</span>
                    </a>
                </div>

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
                        @trailer="trailersSeries(elem.id, index, 'popular')"
                        @closeModal="closeMod">
                    </CardComp>
                </div>

                <!-- Next -->
                <div class="next my-2">
                    <i @click="next($event, store.arrayResultsSeriesPopular, 'arrayResultsSeriesPopular')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-right"></i>
                </div>
                <!-- Prev -->
                <div class="prev my-2">
                    <i @click="prev($event, store.arrayResultsSeriesPopular, 'arrayResultsSeriesPopular')" class="h-100 w-100 d-flex justify-content-center align-items-center text-white fa-solid fa-chevron-left"></i>
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
        
        .title {
            h4 {
                padding-bottom: 0.1rem;
            }
        }

        // next
        .next {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 14rem;
            height: 18.2rem;
            background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.8) 55% 97%, transparent 98%);
            opacity: 0;

            i {
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
            height: 18.2rem;
            background: linear-gradient(to left, transparent, rgba(0, 0, 0, 0.8) 55% 97%, transparent 98%);
            opacity: 0;

            i {
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