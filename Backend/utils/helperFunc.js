import { fetchKeyWords } from "../Services/tmdbService.js";

export const appError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  Error.captureStackTrace(error, appError);
  return error;
};

export const setMovieTrailer = (movieArr) => {
  const data = movieArr.find(
    (ele) =>
      (ele.type === "Trailer" || ele.type === "Teaser") &&
      ele.site === "YouTube"
  );
  const trailerData = {
    youtubeUrl: `https://www.youtube.com/watch?v=${data.key}`,
    embedUrl:
      `https://www.youtube-nocookie.com/embed/${data.key}?` +
      `loop=1&playlist=${data.key}` +
      `&rel=0&modestbranding=1&playsinline=1`,
  };
  //   embedUrl: `https://www.youtube-nocookie.com/embed/${data.key}?` +
  //       `autoplay=1&mute=1&loop=1&playlist=${data.key}` +
  //       `&rel=0&modestbranding=1&playsinline=1`

  return trailerData;
};

export const createQueryParams = async (prefix, paramsData) => {
  const {
    genre,
    tags,
    sortBy,
    yearGte,
    yearLte,
    runtimeGte,
    runtimeLte,
    vote_count_gte,
    vote_average_gte,
  } = paramsData;

  let keyWordIds = [];
  if (tags) {
    const tagsArr = tags.split(",");
    keyWordIds = await fetchKeyWords(tagsArr);
  }

  const tmdbParamsObj = {
    with_genres: genre,
    with_keywords: keyWordIds.join("|"),
    sort_by: sortBy,
    "vote_average.gte": vote_average_gte,
    "vote_count.gte": vote_count_gte,
    "with_runtime.gte": runtimeGte,
    "with_runtime.lte": runtimeLte,
    "primary_release_date.gte": yearGte ? `${yearGte}-01-01` : undefined,
    "primary_release_date.lte": yearLte ? `${yearLte}-12-31` : undefined,
  };

  Object.keys(tmdbParamsObj).forEach((key) => {
    tmdbParamsObj[key] === undefined && delete tmdbParamsObj[key];
  });

  const redisData = createRedisKey(tmdbParamsObj);

  return { tmdbParamsObj, key: `${prefix}:${redisData}` };
};

const createRedisKey = (obj) => {
  const redisKey = Object.keys(obj)
    .sort()
    .reduce((acc, crr) => {
      acc[crr] = obj[crr];
      return acc;
    }, {});
  return JSON.stringify(redisKey);
};
