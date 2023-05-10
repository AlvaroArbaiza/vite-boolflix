<script>
import axios from 'axios';
import { store } from './store.js';
import MySearchComp from './components/MySearchComp.vue';
import MainComp from './components/MainComp.vue';

export default {
    name: "App",
    components: {
        MySearchComp,
        MainComp
    },
    data() {
        return {
            store
        };
    },

    created() {
    },

    computed: {
        
    },
    
    methods: {
        // funzione che prende l'array in base ai risultati trovati
        searchMovie() {

            if (store.inputSearch !== '') {

                // ricerca per film
                axios.get(`${store.pathSearchMovie}${store.apiKey}&query=${encodeURIComponent(store.inputSearch)}`)
                .then(response => {

                    store.arrayResults = response.data.results
                   
                })

                // ricerca per serie tv
                axios.get(`${store.pathSearchSeries}${store.apiKey}&query=${encodeURIComponent(store.inputSearch)}`)
                .then(response => {

                    store.arrayResultsSeries = response.data.results

                    
                })
                
            }            
            console.log(store.arrayResultsSeries)
            console.log(store.arrayResults)
        },
    
    }
}
</script>

<template>
    <MySearchComp @searchMovie="searchMovie" />
    <MainComp />
</template>

<style lang="scss">
@use './style/main.scss';
</style>
