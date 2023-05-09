<script>
import axios from 'axios';
import { store } from './store.js';
import SearchComp from './components/SearchComp.vue';

export default {
    name: "App",
    components: {
        SearchComp
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

                        console.log(response.data.results);


                    })
            }
        }
    }
}
</script>

<template>
    <SearchComp @searchMovie="searchMovie" />
</template>

<style lang="scss">
@use './style/main.scss';
</style>
