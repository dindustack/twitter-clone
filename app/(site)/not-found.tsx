"use-client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function NotFound() {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push("/");
  }, [router]);
  return (
    <div className="h-screen flex flex-col gap-6 justify-center items-center">
      <h2 className="text-white text-2xl font-semibold">
        404 | This page could not be found
      </h2>
      <p
        onClick={handleClick}
        className="text-neutral-400 font-semibold hover:underline"
      >
        View Home
      </p>
    </div>
  );
}
