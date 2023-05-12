import { reactive } from 'vue'

export const store = reactive({
    apiKey: '?api_key=f6136263afcc0dd16ffa7754d6069e4e',
    pathSearchMovie: 'https://api.themoviedb.org/3/search/movie',
    pathSearchSeries: 'https://api.themoviedb.org/3/search/tv',
    pathTopRated: 'https://api.themoviedb.org/3/movie/top_rated',
    pageTopRated: '&page=1',
    inputSearch: '',
    arrayResults: [],
    arrayResultsSeries: [],
    arrayResultsTopRated: [],
    pathImages: 'https://image.tmdb.org/t/p/original/',
    noResults: false,
    noResultsSeries: false,
    bol : true
})
