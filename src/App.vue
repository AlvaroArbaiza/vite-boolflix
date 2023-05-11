<script>
import { store } from './store.js';
import HeaderComp from './components/HeaderComp.vue';
import MainComp from './components/MainComp.vue';

export default {
    name: "App",
    components: {
        HeaderComp,
        MainComp
    },
    data() {
        return {
            store
        };
    }
}
</script>

<template>
    <!-- header -->
    <header class="d-flex align-items-center">
        <HeaderComp />
    </header>

    <!-- main -->
    <main>
        <MainComp />
    </main>
</template>

<style lang="scss">
@use './style/main.scss';

header {
    width: 100%;
    height: 70px;
    background-color: #000000;
}

main {
    width: 100%;
    background-color: #141414;
}

</style>
