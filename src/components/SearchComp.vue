<script>
import { store } from '../store.js';
export default {
    name: 'SearchComp',
    data() {
            return {
                store
            };
        },
}
</script>

<template>
    <div>
        <input type="text" id="search" v-model="store.inputSearch">
        <button type="button" class="btn btn-primary"
        @click="$emit('searchMovie')">Search</button>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;
</style>