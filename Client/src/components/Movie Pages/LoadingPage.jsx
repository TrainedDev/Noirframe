export const DataLoading = () => {
  return (
    <>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black text-white gap-3">
          <div className="w-14 h-14 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
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
