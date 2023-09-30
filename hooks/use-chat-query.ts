
// Note 

// Sử dụng useInfiniteQuery của React Query để fetch dữ liệu chat theo pagination.
// queryKey là key để nhận diện query.
// apiUrl là endpoint API để fetch dữ liệu
// paramKey và paramValue để truyền params vào API, ví dụ channelId hoặc conversationId.
// fetchMessage là hàm callback để gọi API lấy dữ liệu. Nó sử dụng qs để stringify url với params.
// getNextPageParam để lấy cursor cho next page từ dữ liệu trả về.
// refetchInterval để tự động refetch dữ liệu mới nếu socket disconnect.
// Khi có tin nhắn mới từ socket event, gọi setQueryData để cập nhật dữ liệu mới vào cache.
// Các components sử dụng useChatQuery sẽ được tự động cập nhật dữ liệu mới nhờ React Query.
// Cuối cùng là lắng nghe socket events để cập nhật dữ liệu.


import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/providers/socket-provider";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const fetchMessage = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true }
    );
    const res = await fetch(url);
    return res.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessage,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};


