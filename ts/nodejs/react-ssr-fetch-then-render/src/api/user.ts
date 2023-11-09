export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  profileImage: string;
};

export async function fetchUser(): Promise<User> {
  const url = "https://jsonplaceholder.typicode.com/users/1";
  const res = await fetch(url);
  const user: User = await res.json();

  return user;
}
