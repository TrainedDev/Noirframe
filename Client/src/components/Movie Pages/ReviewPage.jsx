import { getMovieReviews, getMoviesPage } from "@/Redux/Slices/movieSlice";
import { Star } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { ReviewsLoading } from "../Components Skeleton/ComponentSkeleton";

const ReviewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    movieReviews,
    movieData,
    loading: { moviePageLoading, reviewsLoading },
    error: { moviePageError, reviewsError },
  } = useSelector((state) => state.movieData);
  console.log(movieReviews);

  useEffect(() => {
    dispatch(getMoviesPage(id));
    dispatch(getMovieReviews(id));
  }, [dispatch, id]);

  console.log(movieData);
  // console.log(movieData?.vote_average);

  return (
    <div className="flex p-3 gap-5 flex-col w-screen h-auto justify-center items-center text-gray-200 sm:p-2 text-base font-medium md:gap-2 md:flex-row md:justify-center md:items-start">
      <section className="w-full flex flex-col gap-y-4 items-center justify-center h-auto sm:w-[70%]  md:w-[80%]  lg:w-[30%]">
        {movieData?.data ? (
          <>
            <div
              className={`w-full flex justify-center items-center  p-5 bg-neutral-900 rounded-sm sm:h-120 aspect-2/3`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w780${movieData?.data.backdrop_path}`}
                alt="movie image"
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="w-full h-full flex flex-col justify-center rounded-sm items-start bg-neutral-900 gap-5 p-5">
              <div className="w-auto flex gap-5 justify-center items-center">
                <h1 className="text-3xl font-bold">
                  {Math.floor(movieData?.data.vote_average)}
                </h1>
                <div className="w-auto h-auto gap-2 flex flex-col ">
                  <ul className="flex justify-start items-center w-full ">
                    {[5, 4, 3, 2, 1].map((ele, i) => (
                      <li key={i}>
                        <Star className="w-[80%] text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.9)]" />
                      </li>
                    ))}
                  </ul>
                  <p className="w-[90%] font-medium text-start capitalize">
                    based on individual ratings
                  </p>
                </div>
              </div>

              <ul className="w-full h-auto flex flex-col justify-center items-start">
                {[5, 4, 3, 2, 1].map((ele, i) => (
                  <li
                    key={i}
                    className="w-full flex justify-between items-center"
                  >
                    <p className="text-white font-bold">{ele}</p>
                    <div className="w-[80%] flex justify-center items-center gap-4">
                      <span className="w-[70%] h-2 bg-gray-500/85 relative rounded-full ">
                        <span
                          className={` h-full absolute rounded-full ${
                            ele == 1
                              ? "bg-red-600 w-[5%]"
                              : ele == 2
                              ? "w-[20%] bg-red-600"
                              : ele == 3
                              ? " bg-yellow-400 w-[40%]"
                              : ele == 4
                              ? "w-[70%] bg-green-600"
                              : "bg-green-600 w-[90%]"
                          } `}
                        ></span>
                      </span>
                      <p>{ele}</p>
                    </div>
                  </li>
                ))}
                {/* <li className="w-full flex justify-between items-center">
                  <p className="text-white font-bold">5</p>
                  <div className="w-[80%] flex justify-center items-center gap-4">
                    <span className="w-[70%] h-2 bg-gray-500/85 relative rounded-full ">
                      <span className="w-[70%] h-full absolute rounded-full bg-green-600"></span>
                    </span>
                    <p>5</p>
                  </div>
                </li> */}
              </ul>
            </div>
          </>
        ) : !moviePageLoading ? (
          <div className="w-full flex flex-col gap-y-4 items-center justify-center h-auto sm:w-[70%]  md:w-[80%] lg:w-[80%]">
            <Skeleton
              className={
                "w-full flex justify-center items-center h-100 p-5 rounded-sm sm:h-120"
              }
            />
            <Skeleton
              className={
                "w-full h-20 flex flex-col justify-center rounded-sm items-start gap-5 p-5"
              }
            />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-y-4 items-center justify-center h-auto sm:w-[70%]  md:w-[80%]  lg:w-[50%]">
            <div
              className={`w-full flex justify-center items-center h-100 p-5 bg-neutral-900 rounded-sm sm:h-120`}
            >
              <img src={moviePageError} />{" "}
            </div>
          </div>
        )}
      </section>

      <section className="flex  flex-col capitalize text-base font-medium w-full h-auto sm:w-[70%]">
        <h1 className="w-full font-semibold text-[18px] p-2">
          total reviews of this movies
        </h1>
        {movieReviews ? (
          <ul className="w-full h-auto flex flex-col justify-center items-center">
            {movieReviews?.slice(0, 3).map((ele, i) => (
              <li
                key={i}
                className="w-full h-auto rounded-sm bg-neutral-900 flex flex-col p-2 justify-center items-start"
              >
                <div className="w-full h-auto gap-2 border-b border-gray-500/80 p-5 flex flex-wrap justify-start items-center">
                  <div className="w-[60%] flex justify-start gap-3 items-center">
                    <Avatar>
                      <AvatarImage
                        src={`https://image.tmdb.org/t/p/w342${ele.avatar_path}`}
                      />
                      <AvatarFallback>
                        <img src="https://github.com/evilrabbit.png" />
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`w-full text-start flex flex-col items-start`}
                    >
                      <h2>{ele.author}</h2>
                      <p className="text-sm">
                        {new Date(ele.created_at).toLocaleString()}
                      </p>
                    </span>
                  </div>
                  <ul className="flex justify-start items-center w-[35%] ">
                    {[5, 4, 3, 2, 1].map((ele, i) => (
                      <li key={i}>
                        <Star className="w-[80%] text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.9)]" />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4  text-base leading-8 tracking-normal text-start font-[550] text-white/90">
                  <p>{ele.content}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : !reviewsLoading ? (
          <ReviewsLoading />
        ) : (
          <img src={reviewsError} />
        )}
      </section>
    </div>
  );
};

export default ReviewPage;
