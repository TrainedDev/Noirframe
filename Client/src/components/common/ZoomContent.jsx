import { Link } from "react-router";
import { CardSkeleton } from "../ui/HeroComponentSkeleton";
import { CarouselContent, CarouselItem } from "../ui/carousel";

const ZoomContent = ({ error, movieLists, loading }) => {
  return (
    <CarouselContent className="ml-1">
      {error ? (
        [1, 2, 3].map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-[48%] sm:basis-[36%] md:basis-[30%] lg:basis-[24%] xl:basis-[25%]"
          >
            <img
              src={error}
              alt="Error"
              className="w-full aspect-[2/3] object-cover"
            />
          </CarouselItem>
        ))
      ) : loading ? (
        <CardSkeleton />
      ) : movieLists ? (
        movieLists?.map((movie) => (
          <CarouselItem
            key={movie.id}
            className="basis-[48%] sm:basis-[36%] md:basis-[30%] lg:basis-[24%] xl:basis-[25%]"
          >
            <Link
              to={`/movie/page/${movie.id}`}
              className="group relative block w-full aspect-[2/3] overflow-hidden"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/fun_movieCard.jpeg"
                }
                alt={movie.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/500.jpeg";
                }}
                className="w-full h-full object-cover object-center
                  transition-transform duration-500
                  group-hover:scale-110"
              />

              <div
                className="absolute bottom-0 left-0 right-0
                              bg-gradient-to-t from-black
                              to-transparent
                              p-3 pt-10
                              text-white"
              >
                <h3 className="font-semibold line-clamp-1">{movie.title}</h3>

                <p className="text-sm text-gray-300">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>
              </div>
            </Link>
          </CarouselItem>
        ))
      ) : (
        [1, 2].map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-[48%] sm:basis-[36%] md:basis-[30%] lg:basis-[24%] xl:basis-[25%]"
          >
            <img
              src="/went_wrong.png"
              alt="Error"
              className="w-full aspect-[2/3] object-cover"
            />
          </CarouselItem>
        ))
      )}
    </CarouselContent>
  );
};

export default ZoomContent;
