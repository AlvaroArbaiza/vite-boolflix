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
            store,
            selectValue: 'all'
        };
    },
    created() {
    },
    mounted() {
        this.films(),
        this.getCategory()
    },
    computed: {
        
    },    
    methods: {

        // chiamata di tuttte le api per films in modo asincrono
        async films() {

            try {
                const [ response1, response2 ] = await Promise.all([

                    axios.get(`${store.path}${store.TopRated}${store.apiKey}${store.page}`),
                    axios.get(`${store.path}${store.Popular}${store.apiKey}${store.page}`)
                ]);       

                if (this.selectValue !== "all") {    

                    console.log('ciao')

                    const filteredResults1 = response1.data.results.filter(elem =>
                        elem.genre_ids.includes(parseInt(this.selectValue))
                    );
                    const filteredResults2 = response2.data.results.filter(elem =>
                        elem.genre_ids.includes(parseInt(this.selectValue))
                    );
                    
                    console.log(filteredResults1)
                    console.log(filteredResults2)

                    store.arrayResultsTopRated = filteredResults1;
                    store.arrayResultsPopular = filteredResults2;

                } else {

                    store.arrayResultsTopRated = response1.data.results;
                    store.arrayResultsPopular = response2.data.results;
                }

            } catch (error) {
                console.error(error);
            }

        },

        // funzione per la chiamata dei trailers di Movies
        async trailersFilms(movieId, index, filmType) {

            if ( !store.closeModal) {

                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos${store.apiKey}`);

                store.arrayTrailers = response.data.results;

                store.arrayTrailers.forEach( (element, ind ) => {
                        
                    if ( element.type == "Trailer" || element.type == "Clip") {
                        store.tlrIndexKey = ind;
                    } 
                });
                
                // assegnazione dell'indice alla variabile
                if (filmType === "topRated") {
                    store.tlrInd = index;
                } else if (filmType === "popular") {
                    store.tlrInd2 = index;
                }

            } else {

                // resetto l'array e l'indice
                store.arrayTrailers = [];
                store.tlrInd = "";
                store.tlrInd2 = "";

                // la variabile diventa di nuovo false resettandosi una volta chiuso il modal
                store.closeModal = false;

            }        
        },

        // Funzione per la chiusura del modal 
        closeMod() {
            store.closeModal = true;
        },

        // chiamata api delle categorie
        async getCategory() {

            try {
                const response = await axios.get(`${store.path}genre/movie/list${store.apiKey}`);

                store.arrayCategory = response.data.genres;

            } catch (error) {
                console.error(error);
            }
        }, 
        
        async showCategory(event) {

            // assegno a una variabile il valore preso con il metodo
            this.selectValue = event.target.value;

            console.log( this.selectValue );

            this.films();
        }
    }
}
</script>
 
<template>
    <div class="container">

        <!-- header film page -->
        <div class="header-films d-flex align-items-center my-4 gap-5">

            <!-- title -->
            <h2 class="text-white fs-1 fw-bold">Films</h2>

            <!-- *** select ***
                @change: implemento l'evento @change per rilevare le modifiche apportate all'elemento di input <select>. Viene attivato quando l'utente interagisce con l'elemento di input e ne cambia il valore.
            -->
            <select class="bg-black border border-light text-white" @change="showCategory">
                <option selected value="all">Category</option>
                <option 
                    v-for="( element, index ) in store.arrayCategory" :key="index" 
                    :value="element.id"
                >
                    {{ element.name }}
                </option>
            </select>
        </div>

        <!-- Top Rated -->
        <div class="mb-4" v-if="store.arrayResultsTopRated.length">
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
                    @trailer="trailersFilms(elem.id, index, 'topRated')"
                    @closeModal="closeMod">
                </CardComp>
            </div>
        </div>

        <!-- Popular -->
        <div v-if="store.arrayResultsPopular.length">
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
                    @trailer="trailersFilms(elem.id, index, 'popular')"
                    @closeModal="closeMod">
                </CardComp>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;

.container {
    .header-films {
        select {
            padding: 0rem 0.3rem;
            width: 6.5rem;
            height: 2rem;
        }
    }
}
</style>