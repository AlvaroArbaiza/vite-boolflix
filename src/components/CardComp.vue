<script>
import { store } from '../store.js';
export default {
    name: 'CardComp',
    // props: ['card', 'flag'],
    props: {
        title: String,
        original_title: String,
        language: String,
        flag: String,
        vote: Number
    },

    data() {
        return {
            store
        };
    }
}
</script>

<template>
    <div class="col-2">
        <div class="card" >
            <!-- <img :src="flag.flags.png" alt=""> -->
            <div class="card-body">

                <!-- Titolo -->
                <h5>{{ title }}</h5>

                <!-- Titolo originale -->
                <h6>{{ original_title }}</h6>
                <!-- <h6>Lingua: {{ card.original_language }}</h6> -->
                <div class="language">
                    <h6 class="m-0">Lingua:</h6>
                    <div class="img">

                        <img :src="flag" :alt="language">
                    </div>
                </div>
                <h6>Voto: {{ vote }}</h6>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;

.language {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;

    .img {
        width: 30px;

        img {
    
            max-width: 100%;
        }
    }
    }
</style>