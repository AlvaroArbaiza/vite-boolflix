<script>
import { store } from '../store.js';
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
}
</script>

<template>
    <div class="container">
            
        <!-- movies -->
        <div class="row flex-wrap" v-if="store.arrayResults.length">
            <h2 class="text-white mt-4">Movies</h2>
            <CardComp v-for="(elem, index) in store.arrayResults" :key="index" 

                :title= "elem.title"
                :original_title= "elem.original_title"
                :language= "elem.original_language"
                :vote= "elem.vote_average"
                :image="elem.poster_path">
            </CardComp>
        </div>

        <!-- series -->
        <div class="row flex-wrap" v-if="store.arrayResultsSeries.length">

            <h2 class="text-white mt-4">Series</h2>
            <CardComp v-for="(elem, index) in store.arrayResultsSeries" :key="index" 

                :title= "elem.name"
                :original_title= "elem.original_name"
                :language= "elem.original_language"
                :vote= "elem.vote_average"
                :image="elem.poster_path">
            </CardComp>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;
</style>