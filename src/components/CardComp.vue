<script>
import { store } from '../store.js';
export default {
    name: 'CardComp',
    props: ['card'],

    data() {
        return {
            store
        };
    },
}
</script>

<template>
    <div class="col-3">

        <img :src="card.poster_path" alt="">
        <h5>Titolo: {{ card.title }}</h5>
        <h6>Titolo Originale: {{ card.original_title }}</h6>
        <h6>Lingua: {{ card.original_language }}</h6>
        <h6>Voto: {{ card.vote_average }}</h6>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;
</style>