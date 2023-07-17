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
    NowPlaying: 'movie/now_playing',
    Upcoming: 'movie/upcoming',
    SeriesTopRated: 'tv/top_rated',
    SeriesPopular: 'tv/popular',
    SeriesAiringToday: 'tv/airing_today',
    SeriesOnTheAir: 'tv/on_the_air',
    page: '&page=1',
    pathYoutube: 'https://www.youtube.com/watch?v=',
    inputSearch: '',
    arrayResultsMovies: [],
    arrayResultsTopRated: [],
    arrayResultsPopular: [],
    arrayResultsNowPlaying: [],
    arrayResultsUpcoming: [],
    arrayResultsSeries: [],
    arrayResultsSeriesTopRated: [],
    arrayResultsSeriesPopular: [],
    arrayResultsSeriesAiringToday: [],
    arrayResultsSeriesOnTheAir: [],
    arrayTrailers: [],
    arrayCategory: [],
    pathImages: 'https://image.tmdb.org/t/p/original/',
    noResults: false,
    noResultsSeries: false,
    isSearching : false,  
    tlrIndexKey: "",
    tlrInd: "",
    tlrInd2: "",
    tlrInd3: "",
    tlrInd4: "",
    tlrIndSeries: "",
    tlrIndSeries2: "",
    tlrIndSeries3: "",
    tlrIndSeries4: "",
    closeModal: false,
    num: 0,
    intro: true
})