import { Loader2Icon } from "lucide-react";

export const DataLoading = () => {
  
  return (
    <>
        <div className=" w-full h-full flex flex-col items-center justify-center text-white gap-2">
          <Loader2Icon className="animate-spin text-red-600 w-[15%] h-[20%] border-t-transparent  "/>
          <p className="text-sm tracking-wide opacity-80">
           Fetching your data from the multiverse
          </p>
        </div>
    </>
  );
};

//         {loading && (
//   <div className="absolute inset-0 z-20 flex items-center justify-center bg-black text-white text-sm animate-pulse">
//     <p>stealing bandwidth from your neighbors…</p>
//   </div>
// )}
