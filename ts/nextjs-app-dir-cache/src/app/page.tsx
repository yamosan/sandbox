async function getNow() {
  const res = await fetch("http://worldtimeapi.org/api/timezone/Asia/Tokyo");
  const data = (await res.json()) as {
    datetime: string;
  };

  await new Promise((res) => setTimeout(res, 800));
  return data;
}

export const revalidate = 5;

export default async function Posts() {
  const { datetime } = await getNow();

  return <div>{datetime}</div>;
}
