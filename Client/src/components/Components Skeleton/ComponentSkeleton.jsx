import { Avatar,  } from "../ui/avatar";
import { CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

export const HeroComponentSkeleton = () => {
  return (
    <>
    <section className="relative w-full min-h-[70vh]">
  {/* Background Skeleton */}
  <Skeleton className="absolute inset-0 w-full h-full" />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content */}
  <div className="relative z-10 w-full h-full px-4 sm:px-8 py-10 flex items-end">
    <div className="w-full max-w-5xl flex flex-col gap-4 pb-8">

      {/* Movie Title */}
      <Skeleton className="h-8 w-[70%]" />

      {/* Runtime + Year */}
      <div className="flex gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3].map((_, i) => (
          <Skeleton
            key={i}
            className="h-6 w-20 rounded-full"
          />
        ))}
      </div>

      {/* Overview */}
      <div className="flex flex-col gap-2 max-w-3xl">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[85%]" />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>

    </div>
  </div>
</section>
    </>
  );
};

export const CardSkeleton = () => {
  return (
    <>
    {[1,2,3,4].map((ele, i) => (
      <CarouselItem key={i} className=" w-full aspect-2/3 rounded-sm p-0 overflow-hidden">
        <Skeleton className={"w-full h-full m-1"} />
      </CarouselItem>
      
    ))}
  
    </>
  );
};

export const ReviewsLoading = () => {
  return (
    <ul className="w-full h-auto flex flex-col gap-4 justify-center items-center">
    {[1, 2, 3].map((_, i) => (
      <li
        key={i}
        className="w-full h-auto rounded-sm bg-neutral-900 flex flex-col p-2"
      >
        {/* Header */}
        <div className="w-full gap-2 border-b border-gray-500/80 p-5 flex flex-wrap items-center">
          <div className="w-[60%] flex gap-3 items-center">
            {/* Avatar Skeleton */}
            <Avatar>
              <Skeleton className="h-10 w-10 rounded-full" />
            </Avatar>

            <span className="w-full flex flex-col gap-2">
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-3 w-[40%]" />
            </span>
          </div>

          {/* Stars Skeleton */}
          <ul className="flex w-[35%] gap-2">
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <li key={idx}>
                <Skeleton className="h-4 w-4 rounded-sm" />
              </li>
            ))}
          </ul>
        </div>

        {/* Review Content Skeleton */}
        <div className="p-4 flex flex-col gap-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[95%]" />
          <Skeleton className="h-3 w-[85%]" />
        </div>
      </li>
    ))}
  </ul>
  );
};
