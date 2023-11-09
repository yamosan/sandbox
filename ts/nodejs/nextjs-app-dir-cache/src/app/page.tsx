async function getNow() {
  const res = await fetch("http://worldtimeapi.org/api/timezone/Asia/Tokyo");
  const data = (await res.json()) as {
    datetime: string;
  };

  console.log("---------------------");
  console.log(data.datetime);
  console.log();

  await new Promise((res) => setTimeout(res, 2000));
  return data;
}

export const revalidate = 5;

export default async function Posts() {
  const { datetime } = await getNow();

  return <div>{datetime}</div>;
}
