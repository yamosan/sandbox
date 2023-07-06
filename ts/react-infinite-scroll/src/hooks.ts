import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  user: User;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  profileImage: string;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

type GetPostsWithUserResponse = Post[];

async function fetchPosts(url: string): Promise<GetPostsWithUserResponse> {
  const res = await fetch(url);
  const posts: GetPostsWithUserResponse = await res.json();

  return posts;
}

type UseInfinitePostParams = {
  limit?: number;
  query?: string;
};

export function useInfinitePost({ limit = 10, query }: UseInfinitePostParams) {
  const getKey = (pageIndex: number, previousPageData: Post[][]) => {
    const baseUrl = "https://jsonplaceholder.typicode.com";
    if (previousPageData && !previousPageData.length) {
      return null;
    }

    const start = limit * pageIndex;

    if (query !== undefined) {
      const start = limit * pageIndex;
      return `${baseUrl}/posts?_expand=user&_limit=${limit}&_start=${start}&title_like=${query}`;
    }

    return `${baseUrl}/posts?_expand=user&_limit=${limit}&_start=${start}`;
  };
  const fetcher = async (url: string) => {
    await new Promise((res) => setTimeout(res, 1000));
    return fetchPosts(url);
  };

  const swrInfiniteResponse = useSWRInfinite(getKey, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateFirstPage: false,
  });
  const { data, setSize } = swrInfiniteResponse;

  const isReachingEnd = useMemo(() => {
    if (data === undefined || data.length === 0) return false;
    if (data[0].length === 0) {
      return true;
    }
    const last = data.at(-1);
    if (last && last.length < 10) {
      return true;
    }

    return false;
  }, [data]);

  const fetchMore = () => {
    setSize((size) => size + 1);
  };

  return {
    ...swrInfiniteResponse,
    data: data?.flat(),
    isReachingEnd,
    fetchMore,
  };
}
