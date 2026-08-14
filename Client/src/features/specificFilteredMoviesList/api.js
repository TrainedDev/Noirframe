import { axiosInstance } from "@/lib/axiosInstance";


export const fetchGenreAndTags = async () => await axiosInstance.get(`/movies/genre_keywords`);

export const fetchFilteredMovieList = async (data) => {
    const {
      genres,
      tags,
      yearGte,
      sortBy,
      yearLte,
      runtimeGte,
      runtimeLte,
      movieListName,
    } = data;

    const response = await axiosInstance.get(`/movies/filter/list`, {
      params: {
        ...(genres?.length && { genres: genres.join("|") }),
        ...(tags?.length && { tags: tags.join(",") }),
        yearGte,
        yearLte,
        sortBy,
        runtimeGte,
        runtimeLte,
        vote_count_gte:
          movieListName === "trending"
            ? 50
            : movieListName === "popularMovies"
              ? 200
              : movieListName === "topRated"
                ? 1000
                : 0,
        vote_average_gte:
          movieListName === "topRated"
            ? 7.5
            : movieListName === "popularMovies"
              ? 6
              : 0,
      },
    });

    return response;
};
