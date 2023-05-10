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
    <div class="container text-center">
        <div class="row flex-wrap">
            
            <!-- movies -->
            <h2>Movies</h2>
            <!-- :flag="store.flagsMovies[index].flags.png"  -->
            <CardComp v-for="(elem, index) in store.arrayResults" :key="index" 

                :title= "elem.title"
                :original_title= "elem.original_title"
                :language= "elem.original_language"
                :vote= "elem.vote_average">
            </CardComp>

            <!-- series -->
            <h2>Series</h2>
            <!-- :flag="store.flagsSeries[index].flags.png"  -->
            <CardComp v-for="(elem, index) in store.arrayResultsSeries" :key="index" 

                :title= "elem.name"
                :original_title= "elem.original_name"
                :language= "elem.original_language"
                :vote= "elem.vote_average">
            </CardComp>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;
</style>