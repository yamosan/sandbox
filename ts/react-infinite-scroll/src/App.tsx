import { Post, useInfinitePost } from "./hooks";
import { css } from "../styled-system/css";
import { useInView } from "react-intersection-observer";
import { flex, grid, stack } from "../styled-system/patterns";

export default function App() {
  const { data, fetchMore, isValidating, isReachingEnd } = useInfinitePost({
    limit: 10,
  });
  const { ref, inView } = useInView();

  if (inView && !isValidating && !isReachingEnd) {
    fetchMore();
  }

  return (
    <>
      <div className={css({ my: "8", maxW: "1400px", mx: "auto" })}>
        <ul
          className={grid({
            gridTemplateColumns: "repeat(auto-fit, 360px)",
            justifyContent: "center",
            gap: "6",
            px: "2",
          })}
        >
          {data?.flat().map((post) => (
            <li key={post.id}>
              <PostItem post={post} />
            </li>
          ))}
        </ul>

        {!isValidating && <div ref={ref} aria-hidden="true" />}
        {isValidating && (
          <div className={flex({ mt: "8", justify: "center" })}>
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}

function Spinner() {
  return (
    <div
      className={flex({ justify: "center", gap: "4" })}
      aria-label="読み込み中"
    >
      {[...Array(3)].map((_, i) => (
        <div
          key={i.toString()}
          className={css({
            animation: "ping",
            h: "2",
            w: "2",
            rounded: "full",
            bg: "blue.600",
          })}
        />
      ))}
    </div>
  );
}

function PostItem({ post }: { post: Post }) {
  return (
    <div
      className={stack({
        direction: "column",
        align: "start",
        p: "4",
        w: "full",
        borderWidth: "1px",
        borderRadius: "md",
        borderColor: "gray.200",
      })}
    >
      <div>
        <h3 className={css({ fontWeight: "bold", textTransform: "uppercase" })}>
          {post.title.slice(0, 30)}
        </h3>
      </div>

      <div className={css({ lineClamp: 2 })}>
        <p>{post.body}</p>
      </div>

      <div className={flex({ gap: "2", alignItems: "center" })}>
        <div>
          <img
            className={css({ rounded: "full" })}
            src={`https://picsum.photos/id/${post.userId}/32/32`}
          />
        </div>
        <div className={flex({ direction: "column" })}>
          <div className={css({ fontSize: "xs" })}>{post.user.name}</div>
          <div className={css({ fontSize: "sm", lineHeight: "1" })}>
            {post.user.username}
          </div>
        </div>
      </div>
    </div>
  );
}
