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

            <CardComp v-for="(elem, index) in store.arrayResults" :key="index" :card="elem" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;
</style>