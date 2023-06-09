import { reactive } from 'vue'

export const store = reactive({
    menu: [
        {
            id: 'Home',
            path: '/'
        },
        {
            id: 'Serie Tv',
            path: '/SeriesTv'
        },
        {
            id: 'Film',
            path: '/Film'
        }
    ],
    apiKey: '?api_key=f6136263afcc0dd16ffa7754d6069e4e',
    path: 'https://api.themoviedb.org/3/',
    SearchMovie: 'search/movie',
    SearchSeries: 'search/tv',
    TopRated: 'movie/top_rated',
    Popular: 'movie/popular',
    SeriesTopRated: 'tv/top_rated',
    SeriesPopular: 'tv/popular',
    page: '&page=1',
    pathYoutube: 'https://www.youtube.com/watch?v=',
    inputSearch: '',
    arrayResultsMovies: [],
    arrayResultsSeries: [],
    arrayResultsSeriesTopRated: [],
    arrayResultsSeriesPopular: [],
    arrayResultsTopRated: [],
    arrayResultsPopular: [],
    arrayTrailers: [],
    pathImages: 'https://image.tmdb.org/t/p/original/',
    noResults: false,
    noResultsSeries: false,
    isSearching : false,  
    tlrIndexKey: "",
    tlrInd: "",
    tlrInd2: "",
    tlrIndSeries: "",
    tlrIndSeries2: "",
    closeModal: false,
    num: 0,
    intro: true
})