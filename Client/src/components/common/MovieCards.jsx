import { Link } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardSkeleton } from "../ui/HeroComponentSkeleton";

const MovieCard = ({ cards }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-start bg-black capitalize text-white w-full h-auto overflow-hidden">
      {cards.map((card, index) => {
        // Don't render cards that have no data
        if (!card.loading && !card.data) {
          return null;
        }

        return (
          <section key={index} className="flex flex-col w-full h-auto">
            <span className="flex h-auto items-center justify-between px-2">
              <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                {card.heading}
              </h1>

              <Link
                to={card.link}
                className="text-red-500 text-sm md:text-base font-semibold"
              >
                View All
              </Link>
            </span>

            <Carousel className="w-full h-auto text-black">
              <CarouselContent className="ml-1">
                {card.error ? (
                  [1, 2, 3].map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-[48%] sm:basis-[36%] md:basis-[30%] lg:basis-[24%] xl:basis-[25%]"
                    >
                      <img
                        src={card.error}
                        alt="Error"
                        className="w-full aspect-[2/3] object-cover"
                      />
                    </CarouselItem>
                  ))
                ) : card.loading ? (
                  <CardSkeleton />
                ) : card.data?.length ? (
                  card.data.map((movie) => (
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
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        />

                        <div
                          className="absolute bottom-0 left-0 right-0
                          bg-gradient-to-t from-black
                          to-transparent
                          p-3 pt-10
                          text-white"
                        >
                          <h3 className="font-semibold line-clamp-1">
                            {movie.title}
                          </h3>

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

              <CarouselPrevious className="left-0.5" />
              <CarouselNext className="right-1.5" />
            </Carousel>
          </section>
        );
      })}
    </div>
  );
};

export default MovieCard;