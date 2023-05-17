import { reactive } from 'vue'

export const store = reactive({
    apiKey: '?api_key=f6136263afcc0dd16ffa7754d6069e4e',
    pathSearchMovie: 'https://api.themoviedb.org/3/search/movie',
    pathSearchSeries: 'https://api.themoviedb.org/3/search/tv',
    pathTopRated: 'https://api.themoviedb.org/3/movie/top_rated',
    pageTopRated: '&page=1',
    pathPopular: 'https://api.themoviedb.org/3/movie/popular',
    pagePopular: '&page=1',
    pathSeriesTopRated: 'https://api.themoviedb.org/3/tv/top_rated',
    pageSeriesTopRated: '&page=1',
    pathSeriesPopular: 'https://api.themoviedb.org/3/tv/popular',
    pageSeriesPopular: '&page=1',
    inputSearch: '',
    arrayResults: [],
    arrayResultsSeries: [],
    arrayResultsSeriesTopRated: [],
    arrayResultsSeriesPopular: [],
    arrayResultsTopRated: [],
    arrayResultsPopular: [],
    pathImages: 'https://image.tmdb.org/t/p/original/',
    noResults: false,
    noResultsSeries: false,
    bol : true
})