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
            axios.get(`${store.path}${store.TopRated}${store.apiKey}${store.page}`)
                .then(response => {

                    store.arrayResultsTopRated = response.data.results              
                })

            // film - popular
            axios.get(`${store.path}${store.Popular}${store.apiKey}${store.page}`)
                .then(response => {

                    store.arrayResultsPopular = response.data.results              
                })

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

        // funzione che ritorna true se non ci sono risultati nella ricerca del film
        noResults() {

            // Se non ci sono risultati in entrambi gli array return true
            if (store.noResults == true && store.noResultsSeries == true) {
                                
                store.bol = false
                return true
            } else {

                return false
            }
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

        // Funzione per scorrere avanti nelle slide s
        next(event) {

            let y, z;
            let next = event.target.parentNode.querySelector(".next");
            let prev = event.target.parentNode.querySelector(".prev");

            store.arrayResultsTopRated.length; // numero di film 
            let slidesToMove = 3; // numero di film da spostare ogni click
            let slidesShowed = 6; // numero di film mostrati

            y = Math.ceil( (store.arrayResultsTopRated.length - slidesShowed) / slidesToMove ); // numero di volte che potrà scorrere

            z = 50 * y // distanza massima che lo slide potrà scorrere
            console.log(z);
        
            // aumento di 50 ogni volta
            store.num += 50;

            if ( store.num <= z) {

                // Targhettizzo row, uscendo da next, prendendo il padre e poi selezionando row
                let row = event.target.parentNode.querySelector(".row");                
                
                row.style.left = `-${store.num}%`;
                
                console.log(row);
                console.log(store.num);

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
            let prev = event.target.parentNode.querySelector(".prev");
            let next = event.target.parentNode.querySelector(".next");

            store.arrayResultsTopRated.length; // numero di film 
            let slidesToMove = 3; // numero di film da spostare ogni click
            let slidesShowed = 6; // numero di film mostrati

            y = Math.ceil( (store.arrayResultsTopRated.length - slidesShowed) / slidesToMove ); // numero di volte che potrà scorrere

            z = 50 * y // distanza massima che lo slide potrà scorrere

            // sottraggo di 50 ogni volta
            store.num -= 50;
            
            if ( store.num <= z) {

                // Targhettizzo row, uscendo da next, prendendo il padre e poi selezionando row
                let row = event.target.parentNode.querySelector(".row");
                            
                row.style.left = `-${store.num}%`;
                
                console.log(row);
                console.log(store.num);
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
    <div id="noResults" class="d-flex justify-content-center bg-white position-relative" v-if="noResults()">
        
        <div id="noReText" class="position-absolute">
            <span class="text-uppercase text-black">no results found</span>
        </div>
        
        <iframe width="1120" height="630" src="https://www.youtube.com/embed/2apVwq-pX9E?start=4&autoplay=1&controls=0&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>

    <div class="container">

        <!--------------------- Home --------------------->
        <div>

            <!----------- movies ----------->
            <div>
                <!-- Top Rated -->
                <div class="carousel" v-if="store.bol">

                    <h2 class="text-white pt-4">Top Rated</h2>
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
                            @trailer="trailerMovieTopR(elem.id, index)"
                            @closeModal="closeMod">
                        </CardComp> 
                        
                    </div>

                    <!-- Next -->
                    <div @click="next" class="next my-2">
                    </div>
                    <!-- Prev -->
                    <div @click="prev" class="prev my-2">
                    </div>
                </div>
        
                <!-- Popular -->
                <div class="carousel" v-if="store.bol">
                
                    <h2 class="text-white pt-4">Popular</h2>
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

                    <!-- Next -->
                    <div @click="next" class="next my-2">
                    </div>
                    <!-- Prev -->
                    <div @click="prev" class="prev my-2">
                    </div>
                </div>
            </div>

            <!----------- tv series ----------->
            <div>
                <!-- Top Rated -->
                <div class="carousel" v-if="store.bol">
                
                    <h2 class="text-white pt-4">Top Rated</h2>
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

                    <!-- Next -->
                    <div @click="next" class="next my-2">
                    </div>
                    <!-- Prev -->
                    <div @click="prev" class="prev my-2">
                    </div>
                </div>
        
                <!-- Popular -->
                <div class="carousel" v-if="store.bol">
                
                    <h2 class="text-white pt-4">Popular</h2>
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

                    <!-- Next -->
                    <div @click="next" class="next my-2">
                    </div>
                    <!-- Prev -->
                    <div @click="prev" class="prev my-2">
                    </div>
                </div>
            </div>
        </div>

            
        <!----------- search movies ----------->
        <div class="row m-0" v-if="store.arrayResultsMovies.length">
            <h2 class="text-white mt-4">Movies</h2>
            <CardComp v-for="(elem, index) in store.arrayResultsMovies" :key="index" 

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

        <!----------- search tv series ----------->
        <div class="row m-0" v-if="store.arrayResultsSeries.length">

            <h2 class="text-white mt-4">Series</h2>
            <CardComp v-for="(elem, index) in store.arrayResultsSeries" :key="index" 

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
            height: calc(100% - 5.3rem);
            background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.8) 55% 97%, transparent 98%);
            border-right: 5px solid white;
            opacity: 0;

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
            height: calc(100% - 5.3rem);
            background: linear-gradient(to left, transparent, rgba(0, 0, 0, 0.8) 55% 97%, transparent 98%);
            border-left: 5px solid white;
            opacity: 0;

            &:hover {
                opacity: 1;
            }
        }
        .row {
            flex-wrap: nowrap;
            position: relative;

        }

        // &::-webkit-scrollbar {
        //     display: none;
        // }
    }
}
</style>