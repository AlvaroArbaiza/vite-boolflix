<script>
import { store } from '../store.js';
import axios from 'axios';
import CardComp from './CardComp.vue';

export default {
    name: 'UpcomingComp',
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
                const response = await axios.get(`${store.path}${store.Upcoming}${store.apiKey}${store.page}`);       

                if (this.selectValue !== "all") {    

                    console.log('ciao')

                    const filteredResults = response.data.results.filter(elem =>
                        elem.genre_ids.includes(parseInt(this.selectValue))
                    );
                    
                    console.log(filteredResults)

                    store.arrayResultsUpcoming = filteredResults;

                } else {

                    store.arrayResultsUpcoming = response.data.results;
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
                if (filmType === "upcoming") {
                    store.tlrInd3 = index;
                }

            } else {

                // resetto l'array e l'indice
                store.arrayTrailers = [];
                store.tlrInd3 = "";

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
            <h2 class="text-white fs-1 fw-bold">Upcoming</h2>

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

        <!-- Upcoming -->
        <div class="mb-4" v-if="store.arrayResultsUpcoming.length">
            <div class="row m-0">
    
                <CardComp v-for="(elem, index) in store.arrayResultsUpcoming" :key="index"  
    
                    :title= "elem.title"
                    :original_title= "elem.original_title"
                    :language= "elem.original_language"
                    :vote= "elem.vote_average"
                    :image="elem.poster_path"
                    :overview="elem.overview"
                    :ind="index"
                    :indTrailer="store.tlrInd3"
                    @trailer="trailersFilms(elem.id, index, 'upcoming')"
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