import { createApp } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App.vue';

import MainComp from './components/MainComp.vue';
import SeriesTvComp from './components/SeriesTvComp.vue';
import FilmComp from './components/FilmComp.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        },
        { 
            path: '/', 
            component: MainComp 
        },
        { 
            path: '/SeriesTv', 
            component: SeriesTvComp
        },
        { 
            path: '/Film', 
            component: FilmComp
        }
    ]
});

const app = createApp(App);

app.use(router);
app.mount('#app')
