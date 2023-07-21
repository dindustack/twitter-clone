import useSWR from "swr";
import fetcher from "@/libs/fetcher";

export const useSession = () => {
  const { data } = useSWR("/api/session", fetcher);
  return {
    data,
  };
};
