"use client";

export const SkeletonItem = () => {
  return (
    <div className="animate-pulse">
      <div className="border-b border-neutral-800 p-5">
        <div className="flex flex-row items-start gap-3">
          <div className="bg-neutral-700 w-16 h-16 rounded-full"></div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <div className="w-8 h-[1rem] bg-neutral-700 rounded-[10px]"></div>
              <div className="w-12 h-[1rem] bg-neutral-700 rounded-[10px]"></div>
              <div className="w-24 h-[1rem] bg-neutral-700 rounded-[10px]"></div>
            </div>
            {/* content */}
            <div className="w-[20vw] h-[1rem] bg-neutral-700 rounded-[10px]"></div>
          </div>
        </div>

        {/* Likes and comments */}
        <div className="flex flex-row items-center mt-3 gap-10">
          <div className="flex flex-row items-center  gap-2 cursor-pointer transition hover:text-sky-500">
            <div className="w-4 h-4 bg-neutral-700 rounded-full"></div>
          </div>
          <div className="w-4 h-4 bg-neutral-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
