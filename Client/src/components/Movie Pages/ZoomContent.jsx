import { useEffect, useState } from "react";
import { CarouselContent, CarouselItem } from "../ui/carousel";
import { CardSkeleton } from "../Components Skeleton/ComponentSkeleton";
import { Link } from "react-router";

const ZoomContent = ({ error, movieLists, loading }) => {
  const [zoom, setZoom] = useState(null);
  const [moviesCard, setMoviesCard] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setMoviesCard(movieLists);
    }
    fetchData();
  }, [movieLists]);

  return (
    <>
      <CarouselContent
        className={" w-[40%] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[23%] ml-1 "}
      >
        {error ? (
          <>
          {[1,2,3].map((ele, i) => 
            <CarouselItem key={i} className={"w-full aspect-2/3"}>
              <img src="/movieCard.jpeg" className="w-full h-full object-center object-cover" />
            </CarouselItem>
          )}
          </>
        ) : loading ? (
          <CardSkeleton />
        ) : (
          moviesCard?.map((ele, item) => (
            <CarouselItem
              className=" w-full aspect-2/3 p-0 m-1 overflow-hidden"
              key={item}
            >
              <Link to={`/movie/page/${ele.id}`} className="w-full h-full">
                <img
                  className={` object-cover object-center transition-transform duration-700 overflow-hidden hover:scale-130  cursor-pointer w-full h-full ${
                    zoom === item ? "scale-130" : "scale-110"
                  }`}
                  src={`https://image.tmdb.org/t/p/w780${ele?.poster_path}`}
                  onTouchStart={() => setZoom(item)}
                  onTouchEnd={() => setZoom(null)}
                />
              </Link>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
    </>
  );
};

export default ZoomContent;
