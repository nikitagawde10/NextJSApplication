// pages/index.tsx
import type { NextPage } from "next";
import useSWR from "swr";
import Link from "next/link";
import { UserType } from "./api/mock-data";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  const { data, error } = useSWR("/api/mock-data", fetcher);

  if (error)
    return (
      <div className="text-3xl font-bold text-red-500 p-4">Failed to load</div>
    );
  if (!data)
    return (
      <div className="text-3xl font-bold text-gray-500 p-4">Loading...</div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-violet-600 mb-4">User Profiles</h1>
      <ul>
        {data.users.map((user: UserType) => (
          <li key={user.id} className="border p-2 mb-2 hover:border-gray-500">
            <Link href={`/users/${user.id}`} passHref>
              <span className="text-black hover:underline cursor-pointer">
                {user.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
