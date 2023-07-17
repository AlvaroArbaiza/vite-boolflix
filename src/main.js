import { createApp } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App.vue';
import '@fortawesome/fontawesome-free/css/all.css'

import MainComp from './components/MainComp.vue';
import SeriesTvComp from './components/SeriesTvComp.vue';
import FilmComp from './components/FilmComp.vue';
import SearchResultsComp from './components/SearchResultsComp.vue';
import NowPlayingComp from './components/NowPlayingComp.vue';
import UpcomingComp from './components/UpcomingComp.vue';

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
            component: MainComp,
            name: 'HomePage'
        },

        // SeriesTvComp - Serie TV
        { 
            path: '/SeriesTv', 
            component: SeriesTvComp,
            name: 'SeriesTv'
        },

        // FilmComp - Film
        { 
            path: '/Film', 
            component: FilmComp,
            name: 'Film'
        },

        // SearchResultsComp - SearchResults
        { 
            path: '/Search', 
            name: 'search-results',
            component: SearchResultsComp
        },

        // NowPlayingComp - NowPlaying
        { 
            path: '/NowPlaying', 
            name: 'now_playing',
            component: NowPlayingComp
        },

        // UpcomingComp - Upcoming
        { 
            path: '/Upcoming', 
            name: 'upcoming',
            component: UpcomingComp
        }
    ]
});

const app = createApp(App);

app.use(router);
app.mount('#app')
