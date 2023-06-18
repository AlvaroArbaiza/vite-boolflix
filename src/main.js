import { createApp } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App.vue';
import '@fortawesome/fontawesome-free/css/all.css'

import MainComp from './components/MainComp.vue';
import SeriesTvComp from './components/SeriesTvComp.vue';
import FilmComp from './components/FilmComp.vue';
import SearchResultsComp from './components/SearchResultsComp.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [

        // Tutte le richieste di route che non corrispondono ad altre definizioni di route verranno reindirizzate al path "/"
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        },

        // MainComp - Home page
        { 
            path: '/', 
            component: MainComp 
        },

        // SeriesTvComp - Serie TV
        { 
            path: '/SeriesTv', 
            component: SeriesTvComp
        },

        // FilmComp - Film
        { 
            path: '/Film', 
            component: FilmComp
        },

        // SearchResultsComp - SearchResults
        { 
            path: '/Search', 
            name: 'search-results',
            component: SearchResultsComp
        }
    ]
});

const app = createApp(App);

app.use(router);
app.mount('#app')
