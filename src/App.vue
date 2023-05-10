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

       // prendo tutte le bandiere
       axios.get('https://restcountries.com/v3.1/all')
        .then(response => {

            // ottengo tutte le denominazioni per le flags
            response.data.forEach(flag => {

                // pusho nell'array tutti gli oggetti che contengono sia le denominazioni che gli url per le flags
                store.arrayFlags.push(flag);

            })
        })
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
                   
                    store.arrayResults.forEach( elem => {

                        let languageMovie = elem.original_language.toUpperCase();

                        if (languageMovie == "EN") {
                            languageMovie = "US";
                            
                        } else if (languageMovie == "JA") {
                            languageMovie = "JP"
                        }

                        for (let i = 0; i < store.arrayFlags.length; i++) {
                            let flag = store.arrayFlags[i].cca2;

                            if (flag.includes(languageMovie)) {
                                store.flagsMovies.push(store.arrayFlags[i])
                            }
                        }
                    })
                })

                // ricerca per serie tv
                axios.get(`${store.pathSearchSeries}${store.apiKey}&query=${encodeURIComponent(store.inputSearch)}`)
                .then(response => {

                    store.arrayResultsSeries = response.data.results

                    store.arrayResultsSeries.forEach( elem  => {

                        let languageSeries = elem.original_language.toUpperCase();

                        if (languageSeries == "EN") {
                            languageSeries = "US";

                        } else if (languageSeries == "JA") {
                            languageSeries = "JP"
                        }

                        for (let i = 0; i < store.arrayFlags.length; i++) {
                            let flag = store.arrayFlags[i].cca2;

                            if (flag.includes(languageSeries)) {
                                store.flagsSeries.push(store.arrayFlags[i])
                            }
                        }
                    })
                })
            
                

                
            }            
            console.log(store.arrayResultsSeries)
            console.log(store.arrayResults)
        },


        // funzione che ritorna le flags in un array
        // flags() {

        //     axios.get('https://restcountries.com/v3.1/all')
        //         .then(response => {

        //             // ottengo tutte le denominazioni per le flags
        //             response.data.forEach(flag => {

        //                 // pusho nell'array tutti gli oggetti che contengono sia le denominazioni che gli url per le flags
        //                 store.arrayFlags.push(flag);

        //             })
        //         })
        // }        
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
