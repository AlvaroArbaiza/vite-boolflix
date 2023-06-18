<script>
import { store } from '../store.js';
export default {
    name: 'MySearchComp',
    data() {
        return {
            store
        };
    },
    computed: {
        getSearchRoute() {
            return {
                name: 'search-results',
                query: {
                keyword: this.store.inputSearch
                }
            };
        }
    },
    methods: {
    }
}
</script>

<template>
    <div class="container d-flex align-items-center p-0">
        <div id="cont-search">
            
            <i class="fa-solid fa-magnifying-glass"></i>  

            <!-- input che al premere il tasto enter attraverso emit richiama il metodo del genitore (search) -->
            <input type="text" id="search" v-model="store.inputSearch"
            @keyup.enter="$emit('search')">
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;

#cont-search {
    position: relative;

    i {
        position: absolute;
        font-size: 1.2rem;
        bottom: 50%;
        left: 0.5rem;
        transform: translateY(50%);
        color: #fff;
        z-index: 1;
    }

    input {
        position: relative;
        width: 20px;
        background-color: transparent;
        border: none;
        border-radius: 2px;
        color: #fff;
        z-index: 2;
        cursor: pointer;
        transition: width 0.4s ease-in-out;

        &:focus {
            cursor: auto;
            width: 200px;
            height: 2rem;
            text-indent: 2rem;
        }
    }
}
</style>