<script>
import { store } from '../store.js';
import axios from 'axios';
import MySearchComp from './MySearchComp.vue';

export default {
    name: 'HeaderComp',
    components: {
        MySearchComp
    },
    data() {
        return {
            store
        };
    },    
    methods: {
        
        // funzione asincrona per la ricerca di film e serie tv, che ottiene gli array in base ai risultati trovati
        async search() {

            // tutto parte se input non è vuoto
            if (store.inputSearch !== '') {

                // Effettua il routing alla pagina dei risultati di ricerca e mette come query sul path, il nome della ricerca effettuata
                this.$router.push({ name: 'search-results', query: { results: this.store.inputSearch } });

                store.isSearching = true;
                
                try {
                    const [response1, response2] = await Promise.all([

                        axios.get(`${store.path}${store.SearchMovie}${store.apiKey}&query=${encodeURIComponent(store.inputSearch)}`),
                        axios.get(`${store.path}${store.SearchSeries}${store.apiKey}&query=${encodeURIComponent(store.inputSearch)}`)
                    ]);

                    store.arrayResultsMovies = response1.data.results;
                    store.arrayResultsSeries = response2.data.results;

                    // Condizione che mi da true se gli array non hanno risultati nella ricerca 
                    if ( store.arrayResultsMovies.length === 0 && store.arrayResultsSeries.length === 0 ) {
                        store.noResults = true
                    } 

                    // reset input
                    store.inputSearch = '';
                
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
}
</script>

<template>
    <div class="container d-flex justify-content-between">

        <!-- left-side -->
        <div id="left" class="d-flex">

            <!-- logo -->
            <div id="logo">
                <router-link to="/">
                    <img src="/img/netflix-logo-complete.png" alt="netflix logo">
                </router-link>
            </div>

            <!-- nav -->
            <nav class="d-flex align-items-center">
                <ul class="d-flex p-0">

                    <!-- links -->
                    <li v-for="(elem, index) in store.menu" :key="index">  
                        
                        <!--
                            ** ROUTER-LINK ** : l'attributo "to" specifica il percorso della rotta a cui si desidera reindirizzare. Quando l'utente fa clic sul link, Vue Router effettuerà reindirizzamento all'URL corrispondente, associando il componente specificato nella definizione della rotta corrispondente al percorso. Questo componente viene quindi renderizzato all'interno di ROUTER-VIEW
                        -->
                        <router-link :to="elem.path">
                            <span>
                                {{ elem.id }}
                            </span>
                            <hr>                            
                        </router-link > 
                    </li>                    
                </ul>        
            </nav>
        </div>

        <!-- right side -->
        <div id="right" class="d-flex align-items-center gap-4">

            <!-- search -->
            <div>
                <MySearchComp @search="search"/>
            </div>

            <!-- kids -->
            <div>
                <a class="text-decoration-none text-white" href="#">
                    <span class="text-uppercase">kids</span>
                </a>
            </div>

            <!-- alerts -->
            <div>
                <a class="text-decoration-none text-white fs-4" href="#">
                    <i class="fa-solid fa-bell"></i>
                </a>
            </div>

            <!-- user -->
            <div id="user">
                <img src="/img/smile-user.jpg" alt="smile image">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../src/style/partials/_mixin.scss' as *;
@use '../style/partials/_variables.scss' as *;

.container {

    // left side
    #left {

        // logo
        #logo {
            min-width: 100px;
            max-width: 150px;
        }

        // nav
        nav {
            ul {
                list-style: none;
                margin: 0 0 0 2rem;
    
                li {    
                    margin: 0 1rem;
                    a {
                        position: relative;
                        color: #ffff;
                        text-decoration: none;
    
                        span {
                            opacity: 0.5;
                        }
                        
                        hr {
                            position: absolute;
                            width: 100%;
                            margin: 0;
                            border: 3px solid #b71811;
                            bottom: -27px;
                            left: 0;
                            opacity: 0;
                        }                           
                    }

                    // ROUTER-LINK otterrà questa classa automaticamente quando la sua rotta corrisponderà a quella corrente
                    .router-link-active {

                        hr,
                        span {
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }

    // right side
    #right {
        #user {
            width: 2rem;
        }
    }
}
</style>