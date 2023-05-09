<script>
import axios from 'axios';
import { store } from './store.js';
import SearchComp from './components/SearchComp.vue';
import MainComp from './components/MainComp.vue';

export default {
    name: "App",
    components: {
        SearchComp,
        MainComp
    },
    data() {
        return {
            store
        };
    },

    created() {
        this.chiamaApi()
    },

    methods: {
        chiamaApi() {

            axios.get(`https://api.themoviedb.org/3/movie/550${store.apiKey}`)
                .then(response => {

                    console.log(response);

                    response.data.genres.forEach((element) => {

                        console.log(element);
                    });
                })
        },

        searchMovie() {

            if (store.inputSearch !== '') {

                const query = store.pathQuery + store.inputSearch;

                axios.get(`${store.pathSearch}${store.apiKey}&query=${store.inputSearch}`)
                    .then(response => {

                        // console.log(response.data.results);

                        store.arrayResults = response.data.results
                        console.log(store.arrayResults);

                        store.arrayResults.forEach((element) => {


                        })

                    })
            }
        }
    }
}
</script>

<template>
    <SearchComp @searchMovie="searchMovie" />
    <MainComp />
</template>

<style lang="scss">
@use './style/main.scss';
</style>
