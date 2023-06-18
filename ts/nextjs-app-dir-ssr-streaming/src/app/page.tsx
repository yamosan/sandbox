import { Suspense, use } from "react";
import { Card, CardFallback } from "./_components/Card";

const fetcher = async (ms: number) => {
  await new Promise((res) => setTimeout(res, ms));
};

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4 h-screen place-content-center w-max mx-auto">
      {[0, 1500, 3000, 4500, 6000, 7500].map((ms, i) => (
        <Suspense fallback={<CardFallback />} key={i}>
          <C id={i} ms={ms} />
        </Suspense>
      ))}
    </div>
  );
}

const C = ({ id, ms }: { id: number; ms: number }) => {
  use(fetcher(ms));

  return (
    <Card
      title={`Card ${id + 1}`}
      body={`サーバーサイドでのデータフェッチに\n${ms / 1000}s かかりました`}
    />
  );
};
