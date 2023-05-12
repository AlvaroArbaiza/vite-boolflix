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
        // funzione che prende l'array in base ai risultati trovati
        searchMovie() {

            if (store.inputSearch !== '') {

                

                // ricerca per film
                axios.get(`${store.pathSearchMovie}${store.apiKey}&query=${encodeURIComponent(store.inputSearch)}`)
                .then(response => {

                    store.arrayResults = response.data.results      
                    
                    if ( store.arrayResults.length == 0 ) {
                        store.noResults = true
                    } else {
                        store.noResults = false
                    }
                    console.log(store.arrayResults.length)
                })

                // ricerca per serie tv
                axios.get(`${store.pathSearchSeries}${store.apiKey}&query=${encodeURIComponent(store.inputSearch)}`)
                .then(response => {

                    store.arrayResultsSeries = response.data.results    

                    if ( store.arrayResultsSeries.length == 0 ) {
                        store.noResultsSeries = true
                    } else {
                        store.noResultsSeries = false
                    }             
                    console.log(store.arrayResultsSeries.length)
                })
                
                // reset input
                store.inputSearch = '';                
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
                <img src="/img/netflix-logo-complete.png" alt="netflix logo">
            </div>

            <!-- nav -->
            <nav class="d-flex align-items-center">
                <ul class="d-flex p-0">
                    <li>
                        <a href="#">
                            <span>
                                Home
                            </span>
                            <hr>                            
                        </a> 
                    </li>
                    <li>
                        <a href="#">
                            <span>
                                Serie TV
                            </span>
                            <hr>                            
                        </a> 
                    </li>
                    <li>
                        <a href="#">
                            <span>
                                Film
                            </span>
                            <hr>                            
                        </a> 
                    </li>
                </ul>        
            </nav>
        </div>

        <!-- right side -->
        <div id="right" class="d-flex align-items-center gap-4">

            <!-- search -->
            <div>
                <MySearchComp @searchMovie="searchMovie"/>
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
                        
                        &:hover hr,
                        &:hover span {
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