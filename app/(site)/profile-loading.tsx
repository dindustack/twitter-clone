"use client";

export const SkeletonProfile = () => {
  return (
    <div className="animate-pulse">
      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-center gap-2">
          <div className="w-[10%] h-[1rem] bg-neutral-700 rounded-[3px]"></div>
        </div>
      </div>
      <div className="bg-slate-700 h-44 relative">
        <div className="absolute -bottom-16 left-4">
          <div className="border-4 border-black h-32 w-32 bg-slate-700 rounded-full"></div>
        </div>
      </div>

      <div className="border-b-[1px] border-neutral-800 pb-4 pt-2">
        <div className="flex justify-end p-2">
          <div className="px-4 py-2 h-8 w-16 bg-slate-700 rounded-full"></div>
        </div>
        <div className="mt-8 px-4">
          <div className="flex flex-col">
            <div className="w-[10%] h-[1rem] bg-slate-700 rounded-[3px]"></div>
          </div>
          <div className="flex flex-col mt-4">
            <div className="w-[8%] h-[0.7rem] bg-slate-700 rounded-[3px]"></div>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <div className="w-4 h-[0.7rem] bg-slate-700 rounded-[3px]"></div>
            <div className="w-[10%] h-[0.7rem] bg-slate-700 rounded-[3px]"></div>
          </div>

          <div className="flex flex-row items-center mt-4 gap-6">
            {/* Following */}
            <div className="flex flex-row items-center gap-1">
              <div className="w-[10%] h-[1rem] bg-slate-700 rounded-[3px]"></div>
            </div>

            {/* Followers */}
            <div className="flex flex-row items-center gap-1">
              <div className="w-[10%] h-[1rem] bg-slate-700 rounded-[3px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
